import crypto from 'crypto';
import fs from 'fs'; // TODO: use promises?
import dotenv from 'dotenv';
import path from 'path';
import pool from '../config/database.js';

dotenv.config();

const getUserImages = async (uid) => {
  const result = await pool.query('SELECT * FROM user_photo WHERE uid = $1',
    [uid]);
  if (result.err) throw result.err;
  return result.rows;
};

const saveImageBlob = async (uid, base64String) => { // TODO: refactor
  const imagePath = process.env.IMAGE_PATH;
  const hash = crypto.randomBytes(16).toString('hex');
  const base64Image = base64String.split(';base64,').pop();
  const buffer = Buffer.from(base64Image);
  if (buffer.length > 5e+6) throw new Error('Image is too large');
  // had to do this.. i'm sorry.. gonna refactor later
  // eslint-disable-next-line no-nested-ternary
  const fileFormat = (base64Image.charAt(0) === '/')
    ? 'jpg'
    : (base64Image.charAt(0) === 'i')
      ? 'png'
      : null;
  if (!fileFormat) { throw new Error('Invalid file format'); }
  const savePath = path.join(path.resolve('./'), `${imagePath}/${uid}`);
  await fs.mkdirSync(savePath, { recursive: true });
  await fs.writeFile(`.${imagePath}/${uid}/${hash}.${fileFormat}`, base64Image, { encoding: 'base64', flag: 'w+' }, (err) => {
    if (err) {
      throw err;
    }
  });
  return (`${imagePath}/${uid}/${hash}.${fileFormat}`);
};

const addImageLink = async (uid, imageLink) => {
  const result = await pool.query('INSERT INTO user_photo (uid, link) VALUES ( $1, $2 ) RETURNING id;', [uid, imageLink]);
  if (result.err) {
    throw result.err;
  }
  return result.rows[0].id;
};

export default {
  addImageLink,
  saveImageBlob,
  getUserImages,
};
