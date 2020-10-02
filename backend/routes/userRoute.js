const express = require('express');
const userController = require('../controllers/userController');

exports.router = (() => {
	let userRouter = express.Router();

	userRouter.route('/register').post(userController.createUser);

	userRouter.route('/login').post(userController.login);

	userRouter
		.route('/verify/password/:id')
		.post(userController.verifyPasswordWithUserId);

	userRouter
		.route('/update/password/:id')
		.post(userController.updatePasswordWithUserId);

	return userRouter;
})();
