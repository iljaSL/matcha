import express from 'express';
import tagController from '../controllers/tagController.js';
import updateController from '../controllers/updateController.js';

const tagRouter = express.Router();

tagRouter.get('/', async (request, response, next) => {
  await tagController.getTags(request, response, next);
});

tagRouter.get('/:id', async (request, response, next) => {
  await tagController.getTagById(request, response, next);
});

tagRouter.post('/updateTag/:id', async (request, response, next) => {
  await updateController.updateTag(request, response, next);
});

tagRouter.post('/', async (request, response, next) => {
  await tagController.addTag(request, response, next);
});

tagRouter.get('/:id/users', async (request, response, next) => {
  await tagController.getTagUsers(request, response, next);
});

export default tagRouter;
