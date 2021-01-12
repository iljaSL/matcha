import bcrypt from 'bcrypt';
import pool from '../config/database.js';

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
                               status = $5
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

const getTagsById = async (id) => pool.query('SELECT tags.id as tagId, tags.tag, users.username FROM tags, usertags, users WHERE usertags.tagid = tags.id AND uid = ($1)', [id]);

const addUserTag = async (uid, tagId) => pool.query('INSERT INTO usertags (uid, tagId) VALUES ($1, $2)', [uid, tagId]);

const removeUserTag = async (userTagId) => pool.query('DELETE FROM usertags WHERE id = ($1)', [userTagId]);

const changeUserLocation = async (uid, long, lat) => {
  if (!(long <= 180 && long >= -180 && lat >= -90 && lat <= 90)) throw (new Error('False coordinates'));
  return pool.query(
    `UPDATE users 
          SET geo_long = $1, geo_lat = $2 
          WHERE id = $3`, [long, lat, uid],
  );
};

export default {
  isDuplicateUser,
  registerUser,
  findUser,
  updatePasswordWithUserId,
  deleteUser,
  getTagsById,
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
};
