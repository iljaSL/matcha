import express from 'express';
import matchController from '../controllers/matchController.js';

const modelRouter = express.Router();

modelRouter.get('/', async (request, response, next) => {
  await matchController.getProfiles(request, response, next);
});

export default modelRouter;
