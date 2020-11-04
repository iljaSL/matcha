import crypto from 'crypto';
import fs from 'fs'; // TODO: use promises?
import path from 'path';
import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

const directoryExists = (filePath) => {
  const dirName = path.dirname(filePath);
  return fs.existsSync(dirName);
};

const saveImageBlob = async (uid, base64String) => {
  const imagePath = process.env.IMAGE_PATH;
  const hash = crypto.randomBytes(16).toString('hex');
  const base64Image = base64String.split(';base64,').pop();
  // had to do this.. i'm sorry.. gonna refactor later
  // eslint-disable-next-line no-nested-ternary
  const fileFormat = (base64Image.charAt(0) === '/')
    ? 'jpg'
    : (base64Image.charAt(0) === 'i')
      ? 'png'
      : null;
  if (!fileFormat) throw new Error('Invalid file format');
  console.log(fileFormat);
  if (!directoryExists(`${imagePath}/${uid}`)) fs.mkdirSync(`${imagePath}/${uid}`, { recursive: true });
  fs.writeFile(`${imagePath}/${uid}/${hash}.${fileFormat}`, base64Image, { encoding: 'base64' }, (err) => {
    if (err) throw new Error('Error writing');
    console.log('File created ');
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
  addImageLink, saveImageBlob,
};
