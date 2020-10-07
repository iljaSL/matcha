import bcrypt from 'bcrypt';
import pool from '../config/database.js';

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

export default {
  updatePasswordWithUserId: async (password, id) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const pwHash = bcrypt.hashSync(password, salt);
    const result = await pool.query({
      sql: 'UPDATE users SET `password` = ? WHERE `id` = ?',
      values: [pwHash, id],
    });
    if (result.err) console.log('Error: ', result.err.message);
    return result.affectedRows;
  },

  findUser: async (field, data) => {
    try {
      const result = await pool.query({
        sql: 'SELECT * FROM ?? WHERE ?? = ?',
        values: ['users', field, data],
      });
      if (result) return result;
    } catch (err) {
      console.log('Error: ', err.message);
    }
  },

  registerUser: async (user) => {
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
  },
};
