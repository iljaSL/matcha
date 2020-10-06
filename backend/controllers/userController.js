import userModel from '../models/userModel.js';
import UserUtil from '../utils/userUtil.js';
import input from '../utils/inputUtil.js';
import jasonWebTokenUtils from '../utils/jasonWebTokenUtils.js';

export default {
  updatePasswordWithUserId: async (request, response, err) => {
    if ((err = input.password(request.body.password).error)) {
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
  },

  // UPDATE PASSWORD

  verifyPasswordWithUserId: async (request, response, err) => {
    if ((err = input.password(request.body.password).error)) return response.status(400).json({ message: err });
    const result = await UserUtil.verifyPasswordWithUserId(
      request.body.password,
      request.params.id,
    );
    if (!result) return response.status(404).json({ message: 'no such user' });
    if (result.status !== 'Password is correct') return response.status(401).json({ message: 'Password is incorrect' });
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

  createUser: async (request, response, err) => {
    const {
      lastname, firstname, username, mail, password,
    } = request.body;
    // TODO: check if there is other way to check the inputs, split into own function at least?

    if ((err = input.lastname(lastname).error)) return response.status(400).json({ error: err });
    if ((err = input.firstname(firstname).error)) return response.status(400).json({ error: err });
    if ((err = input.password(password).error)) return response.status(400).json({ error: err });

    err = await input.username(username);
    if (err) return response.status(400).json({ error: err.error });
    err = await input.mail(mail);
    if (err) return response.status(400).json({ error: err.error });
    if (await UserUtil.isDuplicateUser(username) === true) return response.status(409).json({ error: 'duplicate user exists!' });

    const result = await UserUtil.createUser([
      lastname,
      firstname,
      username,
      mail,
      password,
    ]);

    if (result.status === 'User created with success') return response.status(201).send(result.status);
    return response.status(400).send(result.status);
  },
};
