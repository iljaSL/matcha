import express from 'express';
import imageController from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/:id', async (request, response, next) => imageController.addImage(request, response, next));

imageRouter.get('/:imageId', async (request, response, next) => {
  const blob = await imageController.getImageBlob(request, response, next);
});
export default imageRouter;
