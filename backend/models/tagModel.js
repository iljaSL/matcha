import pool from '../config/database.js';

const getTags = async () => {
  const tags = await pool.query({ sql: 'SELECT * FROM `tags`' });
  return tags;
};

const isDuplicate = async (tag) => {
  const match = await pool.query({
    sql: 'SELECT * FROM `tags` WHERE `tag` = ?',
    values: [tag],
  });
  return (match.length !== 0);
};

const addTag = async (tag) => {
  const result = await pool.query({ sql: 'INSERT INTO tags (tag) VALUES (?)', values: [tag] });
  return result;
};

export default { getTags, isDuplicate, addTag };
