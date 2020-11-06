import axios from 'axios';
import imageModel from '../models/imageModel.js';

const checkUrlValidity = async (url) => {
  try {
    const response = await axios.get(url);
    const contentType = response.headers['content-type'];
    return contentType === 'image/jpg' || contentType === 'image/jpeg'
          || contentType === 'image/png';
  } catch (err) { if (err.errno === -61) return false; throw err; } // invalid url returns false
};

const addImage = async (request, response, next) => { // TODO: refactor
  const { image } = request.body;
  let { link } = request.body;
  const { id } = request.params;
  if (image) {
    try {
      link = `http://${request.headers.host}/${await imageModel.saveImageBlob(id, image)}`;
      await imageModel.addImageLink(id, link);
      return response.status(200).json(link);
    } catch (err) {
      next(err);
    }
  } else if (link) {
    try {
      if (!(await checkUrlValidity(link))) { next(new Error('link invalid')); }
      await imageModel.addImageLink(id, link);
      return response.status(200).json(link);
    } catch (err) {
      next(err);
    }
  }
};

export default {
  addImage,
};
