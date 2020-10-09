import pool from '../config/database.js';

const getTags = async () => pool.query({ sql: 'SELECT * FROM `tags`' });

const getTagById = async (id) => pool.query(
  {
    sql: 'SELECT * FROM `tags` WHERE id = (?)',
    values: [id],
  },
);

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

const getTagUsers = async (tagId) => pool.query({
  sql: 'SELECT DISTINCT usertags.uid AS uid, users.username, tags.id as tagID, tags.tag FROM `tags`, `usertags`, `users` WHERE usertags.tagid = tags.id AND usertags.uid = users.id AND tagid = (?)',
  values: [tagId],
});

export default {
  getTags, getTagById, isDuplicate, addTag, getTagUsers,
};
