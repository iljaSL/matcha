import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;

dotenv.config();

export const initDbListener = () => {
  const database = process.env.NODE_ENV === 'test' ? 'matcha_test' : 'matcha';
  const client = new Client({ // separate client, pool automatically closes quiet connections
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database,
  });
  client.connect((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Listener DB connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Listener DB has too many connections.');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Listener DB connection was refused.');
      }
    } else if (process.env.NODE_ENV !== 'test') { // otherwise supertest gives an error
      console.log('Listener connected!');
    }
  });

  client.on('error', (err) => {
    console.error('Listener error: ', err.stack);
  });

  client.on('notice', (msg) => {
    console.log('New stuff!', msg);
  });

  client.on('notification', (msg) => {
    console.log(msg);
  });

  client.on('end', () => {
    console.log('moro moro');
  });

  client.query('LISTEN new_like');

  return client;
};
