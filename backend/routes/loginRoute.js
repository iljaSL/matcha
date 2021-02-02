import express from 'express';
import userController from '../controllers/userController.js';

const loginRouter = express.Router();

loginRouter.route('/').post(userController.login);

loginRouter.route('/').delete(userController.logout);

export default loginRouter;
