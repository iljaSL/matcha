import express from 'express';
import userController from '../controllers/userController.js';


const userRouter = express.Router();

	userRouter.route('/register').post(userController.createUser);

	userRouter.route('/login').post(userController.login);

	userRouter
		.route('/verify/password/:id')
		.post(userController.verifyPasswordWithUserId);

	userRouter
		.route('/update/password/:id')
		.post(userController.updatePasswordWithUserId);

export default userRouter
