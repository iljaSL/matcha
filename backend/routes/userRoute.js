import express from 'express';
import userController from '../controllers/userController.js';
import updateController from '../controllers/updateController.js';

const userRouter = express.Router();

userRouter.post('/updateUser', async (request, response, next) => {
  await updateController.updateUser(request, response, next);
});

userRouter.get('/blocked/:userId/:blockedUserId', async (request, response, next) => {
  await userController.checkIfUserIsBlocked(request, response, next);
});

userRouter.post('/unblock/:userId/:blockedUserId', async (request, response, error) => {
  await userController.unblockUser(request, response, error);
});

userRouter.post('/block/:userId/:blockedUserId', async (request, response, error) => {
  await userController.blockUser(request, response, error);
});

userRouter.get('/reported/:userId/:reportedUserId', async (request, response, next) => {
  await userController.checkIfUserIsReported(request, response, next);
});

userRouter.post('/report/:userId/:reportedUserId', async (request, response, next) => {
  await userController.reportUser(request, response, next);
});

userRouter.get('/register/:key', async (request, response, err) => {
  await userController.validateUserAfterRegistration(request, response, err);
});

userRouter.post('/forgot-password', async (request, response, err) => {
  await userController.forgotPassword(request, response, err);
});

userRouter.get('/reset-password/:key', async (request, response, err) => {
  await userController.checkPasswordResetKey(request, response, err);
});

userRouter.post('/reset-password/:key', async (request, response, err) => {
  await userController.updatePasswordWithResetKey(request, response, err);
});

userRouter.delete('/:id', async (request, response, err) => {
  await userController.deleteUser(request, response, err);
});

userRouter.post('/profile/:id', async (request, response, next) => {
  await userController.initProfile(request, response, next);
});

userRouter.post('/', async (request, response, err) => {
  await userController.createUser(request, response, err);
});

userRouter
  .route('/verify/password/:id')
  .post(userController.auth);

userRouter.get('/:id/images', async (request, response, next) => userController.getUserImages(request, response, next));

userRouter
  .route('/update/password/:id')
  .post(userController.updatePasswordWithUserId);

userRouter.get('/tags/:id', async (request, response, err) => {
  await userController.getTagsByUid(request, response, err);
});

userRouter.post('/tags/:id', async (request, response, err) => {
  await userController.addTagById(request, response, err);
});

userRouter.delete('/tags/:id', async (request, response, err) => {
  await userController.removeTagById(request, response, err);
});

userRouter.post('/location', async (request, response, next) => {
  await userController.changeUserLocation(request, response, next);
});

userRouter.get('/:id/notifications', async (request, response, next) => {
  await userController.getUserNotifications(request, response, next);
});

userRouter.put('/:id/images', async (request, response, next) => {
  await userController.updateProfilePictures(request, response, next);
});

userRouter.get('/:id', async (request, response, next) => {
  await userController.getUserProfile(request, response, next);
});

userRouter.get('/blockedUsers/:id', async (request, response, next) => {
  await userController.getBlockedUsers(request, response, next);
});


export default userRouter;
