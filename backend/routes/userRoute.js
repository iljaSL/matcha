import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/forgot-password', async (request, response, err) => {
  await userController.forgotPassword(request, response, err);
});

userRouter.get('/reset-password/:key', async (request, response, err) => {
  await userController.checkPasswordResetKey(request, response, err);
});

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

userRouter.get('/tags/:id', async (request, response, err) => {
  await userController.getTagsById(request, response, err);
});

userRouter.post('/tags/:id', async (request, response, err) => {
  await userController.addTagById(request, response, err);
});

userRouter.delete('/tags/:id', async (request, response, err) => {
  await userController.removeTagById(request, response, err);
});

export default userRouter;
