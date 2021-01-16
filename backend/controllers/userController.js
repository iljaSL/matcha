import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import imageModel from '../models/imageModel.js';
import UserUtil from '../utils/userUtil.js';
import input from '../utils/inputUtil.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import sendmail from '../utils/emailUtil.js';

const selfBlockError = new Error('You can not block/unblock yourself!');
selfBlockError.code = '666';

const wrongAuthError = new Error('Wrong authentication');
wrongAuthError.code = '665';

const checkIfUserIsBlocked = async (request, response, next) => {
  const { userId } = request.params;
  const { blockedUserId } = request.params;

  if (userId === blockedUserId) { return next(selfBlockError); }
  try {
    const result = await userModel.checkIfUserIsBlocked(userId, blockedUserId);
    if (result === undefined) return response.status(204).end();
  } catch (err) { next(err); }
  return response.status(200).json({ message: 'user is blocked' });
};

const unblockUser = async (request, response, next) => {
  const { userId, blockedUserId } = request.params;
  if (userId === blockedUserId) { return next(selfBlockError); }
  try {
    await userModel.unblockUser(userId, blockedUserId);
  } catch (err) { next(err); }
  return response.status(200).json({ message: 'user has been unblocked' });
};

const blockUser = async (request, response, next) => {
  const { userId, blockedUserId } = request.params;
  if (userId === blockedUserId) { return next(selfBlockError); }
  try {
    const result = await userModel.blockUser(userId, blockedUserId, next);
    if (result) return response.status(200).json({ message: 'user has been blocked ' });
  } catch (err) { next(err); }
};

const checkIfUserIsReported = async (request, response, next) => {
  const body = request.params;

  if (body.userId === body.reportedUserId) { return response.status(400).json({ error: 'you can not do that!' }); }
  try {
    const result = await userModel.checkIfUserIsReported(body.userId, body.reportedUserId, next);
    if (result === undefined) return response.status(204).end();
    return response.status(200).json({ message: 'user reported' });
  } catch (err) { next(err); }
};

const reportUser = async (request, response, next) => {
  const body = request.params;

  if (body.userId === body.reportedUserId) {
    return response.status(400).json({ error: 'user has been NOT reported' });
  }
  try {
    const result = await userModel.reportUser(body, next);
    if (result) return response.status(200).json({ message: 'user has been reported' });
  } catch (err) { next(err); }
};

const validateUserAfterRegistration = async (request, response) => {
  const result = await userModel.findUser(request.params.key);

  if (result !== '') {
    const validated = await userModel.validateUser(request.params.key);

    if (validated) return response.status(200).json({ message: 'user has been validate.' });
    return response.status(400).json({ message: 'user could not be validated.' });
  } return response.status(400).json({ message: 'user could not be validated.' });
};

const updatePasswordWithResetKey = async (request, response) => {
  const newPassword = request.body.new_password;
  const repeatPassword = request.body.repeat_password;
  const { key } = request.params;

  if (input.password(newPassword).error) return response.status(400).json({ message: 'new password does not work' });
  if (input.password(repeatPassword).error) return response.status(400).json({ message: 'confirm password does not work' });
  if (newPassword !== repeatPassword) return response.status(400).json({ message: 'password and confirm password does not match!' });

  const result = await UserUtil.updatePasswordWithResetKey(newPassword, key);
  if (result.status === 'success') return response.status(201).json({ status: 'password has been updated' });
  return response.status(400).json({ message: 'something went wrong!' });
};

const checkPasswordResetKey = async (request, response, next) => {
  const result = await userModel.findUserKey(request.params.key, next);
  if (result !== undefined) {
    return response.status(200).json({ message: 'success' });
  }
  return response.status(404).json({ message: 'key is not valid' });
};

const forgotPassword = async (request, response, next) => {
  const user = await UserUtil.checkIfUsernameExist({
    username: request.body.username,
  });
  if (user.error) return response.status(404).json({ message: 'user does not exist' });
  await UserUtil.resetUserPassword(user.userData, next);
  return response.status(200).json({ status: 'success' });
};

const deleteUser = async (request, response, next) => {
  const { authorization } = request.headers;
  try {
    const userId = jsonWebTokenUtils.getUserId(authorization);
    if (!userId) { throw wrongAuthError; }
    await userModel.deleteUser(userId);
    return response.status(200).json({ message: 'User has been deleted' });
  } catch (err) { next(err); }
};

const updatePasswordWithUserId = async (request, response, err) => {
  if ((input.password(request.body.password).error)) {
    return response.status(400).json({ message: err });
  }
  const result = await UserUtil.updatePasswordWithUserId(
    request.body.password,
    request.params.id,
  );

  if (result.status !== 'Password has been updated!') {
    return response
      .status(401)
      .json({ message: 'Password could not be updated' });
  }

  return response.status(200).json({ message: 'Password updated!' });
};

// UPDATE PASSWORD

const auth = async (username, password) => {
  const user = (await userModel.findUser('username', username))[0];
  if (!user || !password) return false;
  if (!bcrypt.compare(password, user.password)) return false;
  return true;
};

// LOGIN CONTROLLER

const login = async (request, response, next) => {
  const { username, password } = request.body;
  const user = (await userModel.findUser(username, next));

  if (user === undefined || password === undefined) return response.status(401).json({ message: 'user not found' });
  if (user.status === 0) return response.status(401).json({ message: 'user account has not been activated' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return response.status(401).json({ message: 'invalid username/password' });
  const tokenObject = jsonWebTokenUtils.tokenGenerator([user.id, user.username]);
  return response.status(200).json({
    id: user.id,
    status: user.status,
    message: 'Login successful!',
    username,
    token: tokenObject.token,
    tokenExpiration: tokenObject.expiration,
  });
};

// REGISTER CONTROLLER

const createUser = async (request, response, next) => {
  const { body } = request;
  if (await userModel.isDuplicateUser(body.username, next) === true) return response.status(409).json({ message: 'That user already exists!' });
  if (!UserUtil.checkUserValidity(body)) return response.status(400).json({ message: 'Invalid Input!' });
  body.uuid = (new Date().getTime() + Math.floor(Math.random() * 10000 + 1)).toString(16);
  const created = await userModel.registerUser(body, next);
  if (created) {
    const link = `http://localhost:3000/validateprofile/${body.uuid}`;
    await sendmail.confirmRegistrationWithEmail(body.mail, body.username, link);
    return response.status(201).json({ message: 'User created with success, please check your email and activated your account before you login!', data: created });
  }
};

// USER PROFILE CREATION
const initProfile = async (request, response, next) => { // todo: replace w/ proper put request
  const { profileBlob, tagList, ...rest } = request.body;
  const uid = request.params.id;
  try {
    tagList.forEach((tagId) => userModel.addUserTag(uid, tagId));
    const sexualOrientation = UserUtil.getOrientation(rest.gender, rest.preferences);
    const imagePath = await imageModel.saveImageBlob(uid, profileBlob);
    const profilePicID = await imageModel.addImageLink(uid, imagePath);
    await userModel.addUserProfile(uid, {
      profilePicID, sexualOrientation, ...rest,
    });
  } catch (err) { next(err); }
  return response.status(201).end();
};

// IMAGES

const getUserImages = async (request, response, next) => {
  const uid = request.params.id;
  let imageArray;
  try {
    imageArray = await imageModel.getUserImages(uid);
  } catch (err) { next(err); }
  return response.status(200).json(imageArray);
};

// USER TAGS

const getTagsById = async (request, response, next) => {
  try {
    return response.status(200).json(await userModel.getTagsById(request.params.id));
  } catch (err) { next(err); }
  return response.status(500).end();
};

const addTagById = async (request, response, next) => {
  const tagId = request.params.id;
  const { authorization } = request.headers;
  const tokenUserId = jsonWebTokenUtils.getUserId(authorization);
  try {
    await userModel.addUserTag(tokenUserId, tagId);
  } catch (err) { next(err); }
  return response.status(201).json({ status: 'success' });
};

const removeTagById = async (request, response, next) => {
  const userTagId = request.params.id;
  const { authorization } = request.headers;
  try {
    if (!jsonWebTokenUtils.getUserId(authorization)) { throw new Error('Invalid user'); }
    await userModel.removeUserTag(userTagId);
  } catch (err) { next(err); }
  return response.status(200).json({ status: 'success' });
};

const changeUserLocation = async (request, response, next) => {
  try {
    const tokenUserId = jsonWebTokenUtils.getUserId(request.token);
    if (!tokenUserId) { throw new Error('Invalid token'); }
    const { long, lat } = request.body;
    if (!tokenUserId || !long || !lat) next(new Error('Incomplete request'));
    await userModel.changeUserLocation(tokenUserId, long, lat);
    return response.status(200).json({ message: 'Location changed' });
  } catch (err) { return next(err); }
};

export default {
  createUser,
  initProfile,
  getUserImages,
  auth,
  login,
  updatePasswordWithUserId,
  deleteUser,
  getTagsById,
  addTagById,
  removeTagById,
  forgotPassword,
  checkPasswordResetKey,
  updatePasswordWithResetKey,
  validateUserAfterRegistration,
  reportUser,
  blockUser,
  unblockUser,
  checkIfUserIsBlocked,
  checkIfUserIsReported,
  changeUserLocation,
};
