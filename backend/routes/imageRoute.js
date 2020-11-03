import express from 'express';
import imageController from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/:id', async (request, response, err) => {
  if (await imageController.addImage(request, response, err)) response.status(200).end();
  response.status(504).end();
});

export default imageRouter;
