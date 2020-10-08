import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? 'matcha_test' : 'matcha';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DB connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DB has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DB connection was refused.');
    }
  } else {
    console.log('DB is connected!');
  }
  if (connection) connection.release();
});

pool.query = util.promisify(pool.query);

export default pool;
