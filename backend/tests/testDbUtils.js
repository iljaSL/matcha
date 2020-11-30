import pool from '../config/database';

const truncateAllTables = async () => { // super fiddly due to syntax limitations on TRUNCATE
  await pool.query('TRUNCATE table usertags CASCADE;');
  await pool.query('TRUNCATE table tags CASCADE;');
  await pool.query('TRUNCATE table users CASCADE;');
  await pool.query('TRUNCATE table user_photo CASCADE;');
  await pool.query('TRUNCATE table block CASCADE;');
  await pool.query('TRUNCATE table report CASCADE;');
};

export default truncateAllTables;
