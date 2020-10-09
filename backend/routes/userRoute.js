import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.delete('/:id', async (request, response, err) => {
  await userController.deleteUser(request, response, err);
});

userRouter.post('/', async (req, res, err) => {
  await userController.createUser(req, res, err);
});

userRouter
  .route('/verify/password/:id')
  .post(userController.auth);

userRouter
  .route('/update/password/:id')
  .post(userController.updatePasswordWithUserId);


export default userRouter;
