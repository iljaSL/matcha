import bcrypt from 'bcrypt';
import pool from '../config/database.js';

const findUserInfo = async (key, value, ...args) => {
  const info = args.length === 0 ? '*' : args.join(', ');
  const res = await pool.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
  return res.rows[0];
};

const updateProfile = async (id, column, value) => pool.query(
  `UPDATE users SET ${column} = $1 WHERE id = $2`, [value, id],
);

const checkIfUserIsBlocked = async (userId, blockedUserId) => {
  const result = await pool.query(
    'SELECT * FROM block WHERE user_id = $1 AND blocked_user_id = $2',
    [userId, blockedUserId],
  );
  return result.rows[0];
};

const unblockUser = async (userId, blockUserId) => pool.query(
  'DELETE FROM block WHERE user_id = $1 AND blocked_user_id = $2',
  [userId, blockUserId],
);

const blockUser = async (userId, blockedUserId) => {
  const result = await pool.query(
    'INSERT INTO block (user_id, blocked_user_id) VALUES ($1, $2) RETURNING *',
    [userId, blockedUserId],
  );
  return result.rows[0];
};

const checkIfUserIsReported = async (userId, reportedUserId) => {
  const result = await pool.query(
    'SELECT * FROM report WHERE user_id = $1 AND reported_user_id = $2',
    [userId, reportedUserId],
  );
  return result.rows[0];
};

const reportUser = async (data) => {
  const { userId, reportedUserId } = data;
  const result = await pool.query(
    'INSERT INTO report (user_id, reported_user_id) VALUES ($1, $2) RETURNING *',
    [userId, reportedUserId],
  );
  return result.rows[0];
};

const validateUser = async (key) => { // TODO: error handling for bogus key
  const result = await pool.query(
    'UPDATE users SET key = 0, status = 1 WHERE key = $1', [key],
  );
  return result;
};

const updatePasswordWithResetKey = async (newPassword, key) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  const result = await pool.query(
    'UPDATE users SET password = ($1) WHERE reset_password_key = ($2) RETURNING *', [hashedPassword, key],
  );
  const keyReset = await pool.query(
    'UPDATE users SET reset_password_key = 0 WHERE reset_password_key = ($1) RETURNING *', [key],
  );
  return result.rows[0] + keyReset.rows[0];
};

const addUserProfile = async (uid, formData) => pool.query(`UPDATE users
                                                            SET gender             = $1,
                                                                sexual_orientation = $2,
                                                                bio                = $3,
                                                                profile_picture_id = $4,
                                                                status             = $5
                                                            WHERE id = $6`,
[formData.gender, formData.sexualOrientation, formData.bio,
  formData.profilePicID, 2, uid]);

const setResetKeyForPassword = async (id, key, next) => pool.query(
  'UPDATE users SET reset_password_key = $1 WHERE id = $2', [key, id],
);

const deleteUser = async (userId) => pool.query(
  'DELETE FROM users WHERE id = $1', [userId],
);

const updatePasswordWithUserId = async (password, id) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pwHash = bcrypt.hashSync(password, salt);
  const result = await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2', [pwHash, id],
  );
  return result.affectedRows;
};

const findUser = async (data, next) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [data]);
  if (result) return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  if (result) return result.rows[0];
  return null;
};

const findUserKey = async (data, next) => {
  const result = await pool.query('SELECT * FROM users WHERE reset_password_key = ($1)', [data]);
  if (result) return result.rows[0];
};

const isDuplicateUser = async (username, next) => {
  const result = await findUser(username, next);
  return result !== undefined;
};

const registerUser = async (user, next) => {
  const {
    lastname, firstname, username, mail, password, uuid,
  } = user;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pwHash = bcrypt.hashSync(password, salt);
  const result = await pool.query('INSERT INTO users (lastname, firstname, username, mail, password, key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
    [lastname, firstname, username, mail, pwHash, uuid]);
  return result.rows[0];
};

const getTagsByUid = async (uid) => pool.query(`
    SELECT usertags.uid, tags.id, tags.tag
    FROM usertags
             INNER JOIN tags
                        ON usertags.tagid = tags.id
    WHERE uid = $1`, [uid]);

const addUserTag = async (uid, tagId) => pool.query('INSERT INTO usertags (uid, tagId) VALUES ($1, $2)', [uid, tagId]);

const removeUserTag = async (userTagId) => pool.query('DELETE FROM usertags WHERE id = ($1)', [userTagId]);

const changeUserLocation = async (uid, long, lat) => {
  if (!(long <= 180 && long >= -180 && lat >= -90 && lat <= 90)) throw (new Error('False coordinates'));
  return pool.query(
    `UPDATE users
         SET geo_long = $1,
             geo_lat  = $2
         WHERE id = $3`, [long, lat, uid],
  );
};

const getUserNotifications = async (uid) => (pool.query(`
    WITH updated as (UPDATE notifications
        SET notification_read = true
        FROM users
        WHERE uid = $1 AND notifications.added_by = users.id
        RETURNING notifications.id, notifications.uid, notifications.time_added, event, added_by, username, gender, sexuaL_orientation, profile_picture_id
    )
    SELECT *
    FROM updated
    ORDER BY time_added DESC
    LIMIT 25;
`, [uid]));

const getUserProfile = async (user1, user2) => (await pool.query(`

    WITH master_user AS (
        SELECT *
        FROM users
        WHERE id = $1
    )
    SELECT users.lastname,
           users.firstname,
           users.username,
           users.gender,
           users.sexual_orientation,
           users.mail,
           users.bio,
           users.popularity_score,
           users.geo_lat,
           users.geo_long,
           users.profile_picture_id,
           point((SELECT geo_long FROM master_user), (SELECT geo_lat FROM master_user))
               <@> point(users.geo_long, users.geo_lat) as distance_in_miles
    FROM users
    WHERE id = $2`, [user1, user2])).rows[0];

const placeholderValues = (array) => {
  let placeholder = '';
  for (let i = 1; i < array.length + 1; i++) {
    placeholder += `$${i}`;
    if (i !== array.length) placeholder += ',';
  }
  return placeholder;
};

const validateTagsInDb = async (tags) => {
  const tmp = placeholderValues(tags);
  const result = await pool.query(`SELECT count(id) FROM tags WHERE tag IN (${tmp})`, [
    ...tags,
  ]);
  return tags.length == result.rows[0].count;
};

const userHasTags = async (id) => {
  const result = await pool.query('SELECT count(id) FROM usertags WHERE uid=$1', [id]);
  return result.rows[0].count !== 0;
};

const deleteRow = async (table, column, value) => {
  await pool.query(`DELETE FROM ${table} WHERE ${column} = $1`, [value]);
};

const saveTags = async (query) => {
  const { values, placeholder } = query;
  await pool.query(`INSERT INTO public.usertags(uid, tagid) VALUES ${placeholder}`, [
    ...values,
  ]);
};

const getBlockedUsers = async (id) => {
  const res = await pool.query(
    `SELECT block.user_id as id FROM block
    WHERE block.user_id = $1`,
    [id],
  );
  return res.rows;
const addVisit = async (visitor, visited) => { // if exists, updates timestamp
  await pool.query(`
        UPDATE notifications
        SET time_added = NOW()
        WHERE uid = $1
          AND event = 'visit'
          AND added_by = $2`, [visited, visitor]);


        INSERT INTO notifications (uid, event, added_by)
        SELECT $1, 'visit', $2
        WHERE NOT EXISTS(SELECT 1
                         FROM notifications
                         WHERE uid = $1
                           AND event = 'visit'
                           AND added_by = $2);`, [visited, visitor]);
};

export default {
  getBlockedUsers,
  saveTags,
  deleteRow,
  userHasTags,
  validateTagsInDb,
  isDuplicateUser,
  registerUser,
  findUser,
  updatePasswordWithUserId,
  deleteUser,
  getTagsByUid,
  addUserTag,
  removeUserTag,
  setResetKeyForPassword,
  updatePasswordWithResetKey,
  addUserProfile,
  validateUser,
  reportUser,
  blockUser,
  unblockUser,
  checkIfUserIsBlocked,
  checkIfUserIsReported,
  findUserKey,
  changeUserLocation,
  getUserNotifications,
  updateProfile,
  findUserInfo,
  findUserById,
  getUserProfile,
  addVisit,
};
