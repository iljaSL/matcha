import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import UserUtil from '../utils/userUtil.js';
import input from '../utils/inputUtil.js';
import jasonWebTokenUtils from '../utils/jasonWebTokenUtils.js';
import sendmail from '../utils/emailUtil.js';

export default {
  updatePasswordWithUserId: async (request, response, err) => {
    const { body } = request;
    if (!input.password(body.password)) return response.status(400).json({ message: err });
    const result = await userModel.updatePasswordWithUserId(body.password, request.params.id);
    if (result.err) return response.status(401).json({ message: 'Password could not be updated' });
    return response.status(200).json({ message: 'Password updated!' });
  },

  // UPDATE PASSWORD

  auth: async (request, response, err) => {
    const { body } = request;
    if (!input.password(body.password)) return response.status(400).json({ message: err });
    const result = await userModel.findUser('id', request.params.id);
    if (!result) response.status(404).json({ message: 'no such user' });
    if (!await bcrypt.compare(body.password, result[0].password)) return response.status(401).json({ message: 'Password is incorrect' });
    return response.status(200).json({ message: 'Password is correct' });
  },

  // LOGIN CONTROLLER

  login: async (request, response) => {
    const user = await UserUtil.getUser({
      username: request.body.username,
      password: request.body.password,
    });
    if (user.error) return response.status(401).json({ message: user.error });

    const { id } = user.userData[0];
    const { username } = user.userData[0];
    return response.status(200).json({
      message: 'Login succesfull!',
      username,
      token: jasonWebTokenUtils.tokenGenerator([id, username]),
    });
  },

  // REGISTER CONTROLLER

  createUser: async (request, response) => {
    const { body } = request;
    if (await UserUtil.isDuplicateUser(body.username) === true) return response.status(409).json({ error: 'duplicate user exists!' });
    if (!UserUtil.checkUserValidity(body)) return response.status(400).json({ error: 'invalid user' });
    body.uuid = (new Date().getTime() + Math.floor(Math.random() * 10000 + 1)).toString(16);
    const created = await userModel.registerUser(body);
    if (created) {
      const link = `https://localhost:3000/users/register/${body.uuid}`;
      await sendmail.confirmRegistrationWithEmail(body.mail, body.username, link);
      return response.status(201).json({ status: 'User created with success' });
    }
    return response.status(500).json({ status: 'An error has occurred' });
  },
};
