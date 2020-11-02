import imageModel from '../models/imageModel.js';

const addImage = async (request, response, error) => {
  const { image } = request.body;
  let { link } = request.body;
  const { id } = request.params;
  if (image) link = `http://localhost:8080${await imageModel.saveImageBlob(id, image)}`;
  if (link) {
    try {
      return await imageModel.addImageLink(id, link);
    } catch (err) {
      return null;
    }
  }
  return null;
};

export default {
  addImage,
};
