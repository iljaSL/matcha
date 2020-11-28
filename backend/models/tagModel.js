import pool from '../config/database.js';

const getTags = async () => pool.query({ sql: 'SELECT * FROM `tags`' });

const getTagById = async (id) => pool.query('SELECT * FROM `tags` WHERE id = (?)', [id]);

const isDuplicate = async (tag) => {
  const match = await pool.query('SELECT * FROM `tags` WHERE `tag` = ?', [tag]);
  return (match.length !== 0);
};

const addTag = async (tag) => {
  const result = await pool.query('INSERT INTO tags (tag) VALUES (?)', [tag]);
  return result;
};

const getTagUsers = async (tagId) => pool.query('SELECT DISTINCT usertags.uid AS uid, users.username, tags.id as tagID, tags.tag FROM `tags`, `usertags`, `users` WHERE usertags.tagid = tags.id AND usertags.uid = users.id AND tagid = (?)',
  [tagId]);

export default {
  getTags, getTagById, isDuplicate, addTag, getTagUsers,
};
