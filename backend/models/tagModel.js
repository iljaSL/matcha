import pool from '../config/database.js';

const getTags = async () => (await pool.query('SELECT * FROM tags')).rows;

const getTagById = async (id) => {
  const tag = await pool.query('SELECT * FROM tags WHERE id = ( $1 )', [id]);
  return tag.rows[0];
};
const isDuplicate = async (tag) => {
  const match = await pool.query('SELECT * FROM tags WHERE tag = ( $1 )', [tag]);
  return (match.rows.length !== 0);
};

const addTag = async (tag) => {
  const result = await pool.query('INSERT INTO tags (tag) VALUES ( $1 ) RETURNING id', [tag]);
  return result.rows[0].id;
};

const getTagUsers = async (tagId) => pool.query('SELECT DISTINCT usertags.uid AS uid, users.username, tags.id as tagID, tags.tag FROM tags, usertags, users WHERE usertags.tagid = tags.id AND usertags.uid = users.id AND tagid = ( $1 )',
  [tagId]);

export default {
  getTags, getTagById, isDuplicate, addTag, getTagUsers,
};
