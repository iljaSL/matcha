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
    const result = await pool.query({
      sql: 'UPDATE users SET `key` = NULL, status = 1 WHERE `key` = ?',
      values: [data],
    });
    return result.affectedRows;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePasswordWithResetKey = async (newPassword, key) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  try {
    const result = await pool.query({
      sql: 'UPDATE users SET `password` = ? WHERE `reset_password_key` = ?',
      values: [hashedPassword, key],
    });
    try {
      const keyReset = await pool.query({
        sql: 'UPDATE users SET `reset_password_key` = NULL WHERE `reset_password_key` = ?',
        values: key,
      });
      return result.affectedRows + keyReset.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const setResetKeyForPassword = async (id, key) => {
  try {
    const result = await pool.query({
      sql: 'UPDATE users SET `reset_password_key` = ? WHERE `id` = ?',
      values: [key, id],
    });
    return result.affectedRows;
  } catch (error) {
    return console.log('error');
  }
};

const deleteUser = async (userId) => {
  const result = await pool.query({
    sql: 'DELETE FROM users WHERE `id` = ?',
    values: userId,
  });
  return result.affectedRows;
};

const updatePasswordWithUserId = async (password, id) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pwHash = bcrypt.hashSync(password, salt);
  const result = await pool.query({
    sql: 'UPDATE users SET `password` = ? WHERE `id` = ?',
    values: [pwHash, id],
  });
  if (result.err) console.log('Error: ', result.err.message);
  return result.affectedRows;
};

const findUser = async (field, data) => {
  try {
    const result = await pool.query({
      sql: 'SELECT * FROM ?? WHERE ?? = ?',
      values: ['users', field, data],
    });
    if (result) return result;
  } catch (err) {
    console.log('Error: ', err.message);
  }
};

const isDuplicateUser = async (username) => {
  const result = await findUser('username', username);
  return result.length !== 0;
};

const registerUser = async (user) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const pwHash = bcrypt.hashSync(user.password, salt);
  const result = await pool.query({
    sql:
            'INSERT INTO users (lastname, firstname, username, mail, password, `key`) VALUES (?)',
    values: [[user.lastname, user.firstname, user.username, user.mail, pwHash, user.uuid]],
  });
  if (result.err) console.log('Error: ', result.err.message);
  return result.insertId;
};

const getTagsById = async (id) => pool.query({
  sql: 'SELECT tags.id as tagId, tags.tag, users.username FROM `tags`, `usertags`, `users` WHERE usertags.tagid = tags.id AND uid = (?)',
  values: [id],
});

const addUserTag = async (uid, tagId) => {
  let result;
  try {
    result = await pool.query({
      sql: 'INSERT INTO `usertags` (`uid`, `tagId`) VALUES (?, ?)',
      values: [uid, tagId],
    });
  } catch (err) { result = null; } // TODO: proper error handling
  return result;
};

const removeUserTag = async (userTagId) => {
  let result;
  try {
    result = await pool.query({
      sql: 'DELETE FROM `usertags` WHERE id = (?)',
      values: [userTagId],
    });
  } catch (err) { result = null; } // TODO: proper error handling
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
};
