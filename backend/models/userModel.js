import bcrypt from 'bcrypt';
import pool from '../config/database.js';

const checkIfUserIsBlocked = async (userId, blockedUserId, next) => {
  try {
    const result = await pool.query({
      sql: 'SELECT * FROM block WHERE user_id = ? AND blocked_user_id = ?',
      values: [userId, blockedUserId],
    });
    return result.length > 0;
  } catch (err) {
    next(err);
  }
};

const unblockUser = async (userId, blockUserId, next) => {
  try {
    const result = await pool.query({
      sql: 'DELETE FROM block WHERE user_id = ? AND blocked_user_id = ?',
      values: [userId, blockUserId],
    });
    return result.affectedRows > 0;
  } catch (err) {
    next(err);
  }
};

const blockUser = async (userId, blockedUserId, next) => {
  try {
    const result = await pool.query({
      sql: 'INSERT INTO block (user_id, blocked_user_id) VALUES (?, ?)',
      values: [userId, blockedUserId],
    });
    return result.affectedRows > 0;
  } catch (err) {
    next(err);
  }
};

const checkIfUserIsReported = async (userId, reportedUserId, next) => {
  try {
    const result = await pool.query({
      sql: 'SELECT * FROM report WHERE user_id = ? AND reported_user_id = ?',
      values: [userId, reportedUserId],
    });
    return result.length > 0;
  } catch (err) {
    next(err);
  }
};

const reportUser = async (data, next) => {
  try {
    const result = await pool.query({
      sql: 'INSERT INTO report (user_id, reported_user_id) VALUES (?)',
      values: [data],
    });
    return result.affectedRows;
  } catch (err) {
    next(err);
  }
};

const validateUser = async (data) => {
  try {
    const result = await pool.query(
      'UPDATE users SET key = 0, status = 1 WHERE key = $1', [data],
    );
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePasswordWithResetKey = async (newPassword, key) => {
  console.log('NEW PASSWORD', newPassword);
  console.log('key', key);
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  try {
    const result = await pool.query(
      `UPDATE users SET password = ($1) WHERE reset_password_key = ($2) RETURNING *`, [hashedPassword, key],
    );
    try {
      const keyReset = await pool.query(
        `UPDATE users SET reset_password_key = 0 WHERE reset_password_key = ($1) RETURNING *`, [key],
      );
      return result.rows[0] + keyReset.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const setResetKeyForPassword = async (id, key, next) => {
  try {
    const result = await pool.query(
      'UPDATE users SET reset_password_key = $1 WHERE id = $2', [key, id],
    );
    return result;
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (userId) => {
  const result = await pool.query(
    'DELETE FROM users WHERE id = $1', [userId],
  );
  return result;
};

const updatePasswordWithUserId = async (password, id) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pwHash = bcrypt.hashSync(password, salt);
  const result = await pool.query(
    `UPDATE users SET password = $1 WHERE id = $2`, [pwHash, id],
  );
  if (result.err) console.log('Error: ', result.err.message);
  return result.affectedRows;
};

const findUser = async (data, next) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = ($1)', [data]);
    if (result) return result.rows[0];
  } catch (err) {
    next(err);
  }
};

const findUserKey = async (data, next) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE reset_password_key = ($1)`, [data]);
    if (result) return result.rows[0];
  } catch (err) {
    next(err);
  }
}

const isDuplicateUser = async (username, next) => {
  const result = await findUser(username, next);
  return result !== undefined;
};

const registerUser = async (user, next) => {
  try {
    const {
      lastname, firstname, username, mail, password, uuid,
    } = user;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const pwHash = bcrypt.hashSync(password, salt);
    const result = await pool.query('INSERT INTO users (lastname, firstname, username, mail, password, key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [lastname, firstname, username, mail, pwHash, uuid]);
    return result.rows[0];
  } catch (err) {
    next(err);
  }
};

const getTagsById = async (id) => pool.query('SELECT tags.id as tagId, tags.tag, users.username FROM tags, usertags, users WHERE usertags.tagid = tags.id AND uid = ($1)', [id]);

const addUserTag = async (uid, tagId) => {
  let result;
  try {
    result = await pool.query('INSERT INTO usertags (uid, tagId) VALUES ($1, $2)', [uid, tagId]);
  } catch (err) {
    console.log(err); throw err;
  } // TODO: proper error handling
  return result;
};

const removeUserTag = async (userTagId) => {
  let result;
  try {
    result = await pool.query('DELETE FROM usertags WHERE id = ($1)', [userTagId]);
  } catch (err) { result = null; throw err;} // TODO: proper error handling
  return result;
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
  validateUser,
  reportUser,
  blockUser,
  unblockUser,
  checkIfUserIsBlocked,
  checkIfUserIsReported,
  findUserKey,
};
