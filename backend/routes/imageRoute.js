import express from 'express';
import imageController from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/:id', async (request, response, next) => {
  await imageController.addImage(request, response, next);
});

export default imageRouter;
