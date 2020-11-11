import pool from '../config/database';

const truncateAllTables = async () => { // super fiddly due to syntax limitations on TRUNCATE
  await pool.query({
    sql: 'SET FOREIGN_KEY_CHECKS = 0;',
  });
  await pool.query({
    sql: 'TRUNCATE table usertags;',
  });
  await pool.query({
    sql: 'TRUNCATE table tags;',
  });
  await pool.query({
    sql: 'TRUNCATE table user_photo;',
  });
  await pool.query({
    sql: 'TRUNCATE table users;',
  });
};

export default truncateAllTables;
