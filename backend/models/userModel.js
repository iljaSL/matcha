import bcrypt from 'bcrypt';
import pool from '../config/database.js';

export default {
  updatePasswordWithUserId: async (password, id) => {
    console.log('UPDATED PASSWORD', password);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    password = bcrypt.hashSync(password, salt);
    try {
      const result = await pool.query({
        sql: 'UPDATE users SET `password` = ? WHERE `id` = ?',
        values: [password, id],
      });
      return result.affectedRows;
    } catch (err) {
      console.log('Error: ', err.message);
    }
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
    const passwordHash = bcrypt.hashSync(user.password, salt);
    try {
      const result = await pool.query({
        sql:
            'INSERT INTO users (lastname, firstname, username, mail, password, `key`) VALUES (?)',
        values: [[user.lastname, user.firstname, user.username, user.mail, passwordHash, user.uuid]],
      });
      return result.insertId;
    } catch (err) {
      console.log('Error: ', err.message);
    }
  },
};
