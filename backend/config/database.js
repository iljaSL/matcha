// import mysql from 'mysql';
import util from 'util';
import dotenv from 'dotenv';

import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? 'matcha_test' : 'matcha';

const pool = new Pool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database,
});

pool.connect((err, connection) => {
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
  } else if (process.env.NODE_ENV !== 'test') { // otherwise supertest gives an error
    console.log('DB is connected!');
  }
  if (connection) connection.release();
});

export default {
  query: (text, params) => pool.query(text, params),
};
