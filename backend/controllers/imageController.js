import imageModel from '../models/imageModel.js';

const addImage = async (request, response, error) => {
  const { image } = request.body;
  let { link } = request.body;
  const { id } = request.params;
  // TODO: figure out how to handle errors CORRECTLY
  if (image) {
    try {
      link = `http://localhost:8080${await imageModel.saveImageBlob(id, image)}`;
    } catch (err) {
      console.log(err.message);
    }
  }

  if (link) {
    try {
      return await imageModel.addImageLink(id, link);
    } catch (err) {
      console.log(err);
    }
  }
  return null;
};

export default {
  addImage,
};
