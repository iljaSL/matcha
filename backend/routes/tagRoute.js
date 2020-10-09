import express from 'express';
import tagController from '../controllers/tagController.js';

const tagRouter = express.Router();

tagRouter.get('/', async (request, response, err) => {
  await tagController.getTags(request, response, err);
});

tagRouter.get('/:id', async (request, response, err) => {
  await tagController.getTagById(request, response, err);
});

tagRouter.post('/', async (request, response, err) => {
  await tagController.addTag(request, response, err);
});

tagRouter.get('/users/:id', async (request, response, err) => {
  await tagController.getTagUsers(request, response, err);
});

export default tagRouter;
