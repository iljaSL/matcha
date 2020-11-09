import crypto from 'crypto';
import fs from 'fs'; // TODO: use promises?
import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

const getUserImages = async (uid) => {
  const result = await pool.query({
    sql: 'SELECT * FROM user_photo WHERE uid=?',
    values: [uid],
  });
  if (result.err) throw result.err;
  return result;
};

const saveImageBlob = async (uid, base64String) => { // TODO: refactor
  const imagePath = process.env.IMAGE_PATH;
  const hash = crypto.randomBytes(16).toString('hex');
  const base64Image = base64String.split(';base64,').pop();
  // had to do this.. i'm sorry.. gonna refactor later
  // eslint-disable-next-line no-nested-ternary
  const buffer = Buffer.from(base64Image);
  if (buffer.length > 5e+6) throw new Error('Image is too large');
  const fileFormat = (base64Image.charAt(0) === '/')
    ? 'jpg'
    : (base64Image.charAt(0) === 'i')
      ? 'png'
      : null;
  if (!fileFormat) { throw new Error('Invalid file format'); }
  await fs.access(`${imagePath}/${uid}`, async (err) => {
    if (err) {
      fs.mkdir(`${imagePath}/${uid}`, { recursive: true }, async (err2) => {
        if (err2) { throw err; }
      });
    }
  });

  fs.writeFile(`${imagePath}/${uid}/${hash}.${fileFormat}`, base64Image, { encoding: 'base64' }, (err) => {
    if (err) {
      console.log(err.message);
      throw new Error('Error writing');
    }
  });
  return (`${imagePath}/${uid}/${hash}.${fileFormat}`);
};

const addImageLink = async (uid, imageLink) => {
  const result = await pool.query({
    sql: 'INSERT INTO user_photo (uid, link) VALUES (?, ?)',
    values: [uid, imageLink],
  });
  if (result.err) throw result.err;
  return result;
};

export default {
  addImageLink,
  saveImageBlob,
  getUserImages,
};
