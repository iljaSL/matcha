import express from 'express';
import matchController from '../controllers/matchController.js';

const matchRouter = express.Router();

matchRouter.get('/:distance', async (request, response, next) => {
  await matchController.getProfiles(request, response, next);
});

matchRouter.post('/like/:likedId', async (request, response, next) => {
  await matchController.addLike(request, response, next);
});

matchRouter.delete('/like/:likedId', async (request, response, next) => {
  await matchController.removeLike(request, response, next);
});

matchRouter.get('/like/:profileId', async (request, response, next) => {
  await matchController.getMatchStatus(request, response, next);
});

export default matchRouter;
