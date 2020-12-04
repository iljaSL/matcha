import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import imageModel from '../models/imageModel.js';
import UserUtil from '../utils/userUtil.js';
import input from '../utils/inputUtil.js';
import jasonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import sendmail from '../utils/emailUtil.js';
import tagModel from '../models/tagModel.js';

const checkIfUserIsBlocked = async (request, response, next) => {
  const { userId } = request.params;
  const { blockedUserId } = request.params;

  if (userId === blockedUserId) { return response.status(400).json({ error: 'you can not do that!' }); }

  const result = await userModel.checkIfUserIsBlocked(userId, blockedUserId, next);
  if (result) return response.status(200).json({ message: 'user is blocked' });
  return response.status(204).json({ message: 'user is not blocked' });
};

const unblockUser = async (request, response, next) => {
  const { userId } = request.params;
  const { blockedUserId } = request.params;

  if (userId === blockedUserId) { return response.status(400).json({ error: 'you can not unblock yourself!' }); }

  const result = await userModel.unblockUser(userId, blockedUserId, next);

  if (result) return response.status(200).json({ message: 'user has been unblocked' });
  return response.status(400).json({ error: 'unblocking failed' });
};

const blockUser = async (request, response, next) => {
  const { userId } = request.params;
  const { blockedUserId } = request.params;

  if (userId === blockedUserId) {
    return response.status(400).json({ error: 'you can not block yourself!' });
  }

  const result = await userModel.blockUser(userId, blockedUserId, next);
  if (result) return response.status(200).json({ message: 'user has been blocked ' });
};

const checkIfUserIsReported = async (request, response, next) => {
  const { userId } = request.params;
  const { reportedUserId } = request.params;

  if (userId === reportedUserId) { return response.status(400).json({ error: 'you can not do that!' }); }
  const result = await userModel.checkIfUserIsBlocked(userId, reportedUserId, next);
  if (result) return response.status(200).json({ message: 'user reported' });
  return response.status(204).json({ message: 'user is not reported' });
};

const reportUser = async (request, response, next) => {
  const { userId } = request.params;
  const { reportedUserId } = request.params;

  if (userId === reportedUserId) {
    return response.status(400).json({ error: 'user has been NOT reported' });
  }
  const result = await userModel.reportUser([userId, reportedUserId], next);
  if (result) return response.status(200).json({ message: 'user has been reported' });
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

  if (input.password(newPassword).error) return response.status(400).json({ error: 'new password does not work' });
  if (input.password(repeatPassword).error) return response.status(400).json({ error: 'password 2 does not work' });
  if (newPassword !== repeatPassword) return response.status(400).json({ error: 'passwords do not match!' });

  const result = await UserUtil.updatePasswordWithResetKey(newPassword, key);
  if (result.status === 'success') return response.status(201).json({ status: 'password has been updated' });
  return response.status(400).json({ error: 'something went wrong' });
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
    login: request.body.login,
  });
  if (user.error) return response.status(404).json({ error: 'user does not exist' });
  await UserUtil.resetUserPassword(user.userData, next);
  return response.status(200).json({ status: 'success' });
};

const deleteUser = async (request, response) => {
  const { authorization } = request.headers;
  const userId = jasonWebTokenUtils.getUserId(authorization);
  if (request.params.id === userId) {
    await userModel.deleteUser(userId);
    return response.status(200).json({ message: 'User has been deleted' });
  }
  return response.status(401).json({ error: 'token missing or invalid' });
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
  if (!user || !password) return response.status(404).json({ message: 'user not found' });
  if (!user.status) return response.status(401).json({ message: 'user account has not been activated' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return response.status(401).json({ message: 'invalid username/password' });
  return response.status(200).json({
    id: user.id,
    message: 'Login successful!',
    username,
    token: jasonWebTokenUtils.tokenGenerator([user.id, user.username]),
  });
};

// REGISTER CONTROLLER

const createUser = async (request, response, next) => {
  const { body } = request;
  if (await userModel.isDuplicateUser(body.username, next) === true) return response.status(409).json({ error: 'duplicate user exists!' });
  if (!UserUtil.checkUserValidity(body)) return response.status(400).json({ error: 'invalid user' });
  body.uuid = (new Date().getTime() + Math.floor(Math.random() * 10000 + 1)).toString(16);
  const created = await userModel.registerUser(body, next);
  if (created) {
    const link = `http://localhost:3001/api/users/register/${body.uuid}`;
    await sendmail.confirmRegistrationWithEmail(body.mail, body.username, link);
    return response.status(201).json({ status: 'User created with success', data: created });
  }
};

// USER PROFILE CREATION
const initProfile = async (request, response, next) => { // todo: replace w/ proper put request
  const { profileBlob, ...rest } = request.body;
  const uid = request.params.id;
  try {
    const sexualOrientation = UserUtil.getOrientation(rest.gender, rest.preferences);
    const imagePath = await imageModel.saveImageBlob(uid, profileBlob);
    const profilePicID = await imageModel.addImageLink(uid, imagePath);
    await userModel.addUserProfile(uid, {
      profilePicID, sexualOrientation, ...rest,
    });
  } catch (err) { next(err); }
  return response.status(201).json({ status: 'success' });
};

// USER TAGS

const getTagsById = async (request, response) => {
  const tagList = await userModel.getTagsById(request.params.id);
  response.status(200).json(tagList);
};

const addTagById = async (request, response) => {
  const tagId = request.params.id;
  const { authorization } = request.headers;
  const tokenUserId = jasonWebTokenUtils.getUserId(authorization);
  if (tokenUserId) {
    const result = await userModel.addUserTag(tokenUserId, tagId);
    if (!result) return response.status(409).json({ status: 'duplicate' });
    return response.status(201).json({ status: 'success' });
  }
  return response.status(401).json({ error: 'token missing or invalid' });
};

const removeTagById = async (request, response) => {
  const userTagId = request.params.id;
  const { authorization } = request.headers;
  const tokenUserId = jasonWebTokenUtils.getUserId(authorization);
  if (tokenUserId) {
    const result = await userModel.removeUserTag(userTagId);
    return response.status(200).json({ status: 'success' });
  }
  return response.status(401).json({ error: 'token missing or invalid' });
};

export default {
  createUser,
  initProfile,
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
};
