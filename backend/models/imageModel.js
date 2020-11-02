import crypto from 'crypto';
import fs from 'fs'; // TODO: use promises?
import path from 'path';
import pool from '../config/database.js';

const directoryExists = (filePath) => {
  const dirName = path.dirname(filePath);
  return fs.existsSync(dirName);
};

const saveImageBlob = async (uid, base64String) => {
  /* hard-coded for jpeg TODO: check for magic numbers to identify the file type and add png support
https://en.wikipedia.org/wiki/List_of_file_signatures
or use image-type package
 */
  const hash = crypto.randomBytes(8).toString('hex');
  const base64Image = base64String.split(';base64,').pop();
  if (!directoryExists(`../public/images/${uid}`)) fs.mkdirSync(`../public/images/${uid}`, { recursive: true });
  fs.writeFile(`../public/images/${uid}/${hash}.jpg`, base64Image, { encoding: 'base64' }, (err) => {
    if (err) console.log(err);
    else console.log('File created ');
  }); // TODO: .env for file path?
  return (`/public/images/${uid}/${hash}.jpg`);
};

const addImageLink = async (uid, imageLink) => {
  console.log('Add image link', uid, imageLink);
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
