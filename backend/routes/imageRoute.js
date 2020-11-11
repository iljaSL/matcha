import express from 'express';
import imageController from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/:id', async (request, response, next) => {
  if (!request.token) next(new Error('invalid token'));
  return imageController.addImage(request, response, next);
});

export default imageRouter;
