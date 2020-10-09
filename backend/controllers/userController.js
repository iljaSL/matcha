import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import UserUtil from '../utils/userUtil.js';
import input from '../utils/inputUtil.js';
import jasonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import sendmail from '../utils/emailUtil.js';
import tagModel from '../models/tagModel.js';

const deleteUser = async (request, response) => {
  const { authorization } = request.headers;
  const userId = jasonWebTokenUtils.getUserId(authorization);

  if (Number(request.params.id) === userId) {
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

const login = async (request, response) => {
  const { username, password } = request.body;
  const user = (await userModel.findUser('username', username))[0];
  if (!user || !password) return response.status(404).json({ message: 'user not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return response.status(401).json({ message: 'invalid username/password' });
  return response.status(200).json({
    id: user.id,
    message: 'Login successful!',
    body: username,
    token: jasonWebTokenUtils.tokenGenerator([user.id, user.username]),
  });
};

// REGISTER CONTROLLER

const createUser = async (request, response) => {
  const { body } = request;
  if (await userModel.isDuplicateUser(body.username) === true) return response.status(409).json({ error: 'duplicate user exists!' });
  if (!UserUtil.checkUserValidity(body)) return response.status(400).json({ error: 'invalid user' });
  body.uuid = (new Date().getTime() + Math.floor(Math.random() * 10000 + 1)).toString(16);
  const created = await userModel.registerUser(body);
  if (created) {
    const link = `https://localhost:3000/users/register/${body.uuid}`;
    await sendmail.confirmRegistrationWithEmail(body.mail, body.username, link);
    return response.status(201).json({ status: 'User created with success' });
  }
  return response.status(500).json({ status: 'An error has occurred' });
};

const getTagsById = async (request, response) => {
  const tagList = await userModel.getTagsById(request.params.id);
  response.status(200).json(tagList);
};

export default {
  createUser, auth, login, updatePasswordWithUserId, deleteUser, getTagsById,
};
