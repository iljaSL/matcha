import axios from 'axios';
import imageModel from '../models/imageModel.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';

const checkUrlValidity = async (url) => {
  try {
    const response = await axios.get(url);
    const contentType = response.headers['content-type'];
    return contentType === 'image/jpg' || contentType === 'image/jpeg'
          || contentType === 'image/png';
  } catch (err) { if (err.errno === -61) return false; throw err; } // invalid url returns false
};

const addImage = async (request, response, next) => { // TODO: refactor
  try {
  const { image } = request.body;
  let { link } = request.body;
  const id = jsonWebTokenUtils.getUserId(request.token);
  if (image) {
      link = `${await imageModel.saveImageBlob(id, image)}`;
      await imageModel.addImageLink(id, link);
      return response.status(200).json(link);
  } else if (link) {
      if (!(await checkUrlValidity(link))) { next(new Error('link invalid')); }
      const imageId = await imageModel.addImageLink(id, link);
      return response.status(200).json(imageId);
    }
  } catch (err) {
      next(err);
    }
    return response.status(500);
  };

const getImageBlob = async (request, response, next) => {
  try {
    const { imageId } = request.params;
    const imageLink = (await imageModel.getImageInfo(imageId)).link;
    const blob = await imageModel.getImageBlob(imageLink);
    return response.status(200).json({ imageId, imageBlob: blob });
  } catch (err) { next(err); }
};

export default {
  addImage,
  getImageBlob,
};
