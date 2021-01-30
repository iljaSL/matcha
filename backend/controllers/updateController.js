import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import UserUtil from '../utils/userUtil.js';
import jsonWebTokenUtils from '../utils/jasonWebTokenUtils.js';

const wrongAuthError = new Error('Wrong authentication');
wrongAuthError.code = '665';

const updateUser = async (request, response, next) => {
  try {
    const {
      key,
      firstname,
      lastname,
      bio,
      gender,
      sexual_orientation,
      mail,
      newPassword,
      oldPassword,
    } = request.body;
    console.log('REQUEST', request.body);
    console.log('AUTHTTTTT', request.headers);
    const { authorization } = request.headers;
    console.log('AUTH', authorization);
    const userId = jsonWebTokenUtils.getUserId(authorization);

    let password;
    let error = {};

    if (!userId) { throw wrongAuthError; }
    switch (key) {
      case 'name':
        error = UserUtil.validateName(firstname, 'firstname');
        error = { ...error, ...UserUtil.validateName(lastname, 'lastname') };
        break;
      case 'bio':
        error = UserUtil.validateBio(bio, response);
        break;
      case 'gender':
        error = UserUtil.validateGender(gender);
        break;
      case 'sexual_orientation':
        error = UserUtil.validateOrientation(sexual_orientation);
        break;
      case 'mail':
        error = UserUtil.validateMail(mail);
        break;
      case 'password':
        if (await UserUtil.checkPassword(userId, oldPassword)) {
          error = await UserUtil.validatePassword(newPassword);

          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          password = bcrypt.hashSync(newPassword, salt);
        } else {
          error = { oldPasswordError: 'wrong password' };
        }
        break;
      default:
        return response.json({ message: 'Invalid input' });
    }

    if (Object.keys(error).length !== 0) {
      return response.status(400).json({ message: 'Invalid Input!' });
    }

    if (key === 'name') {
      await userModel.updateProfile(userId, 'firstname', firstname);
      await userModel.updateProfile(userId, 'lastname', lastname);
    }
    if (key === 'gender') {
      await userModel.updateProfile(userId, key, gender);
    }
    if (key === 'bio') {
      await userModel.updateProfile(userId, key, bio);
    }
    if (key === 'sexual_orientation') {
      await userModel.updateProfile(userId, key, sexual_orientation);
    }
    if (key === 'mail') {
      await userModel.updateProfile(userId, key, mail);
    }
    if (key === 'password') {
      await userModel.updateProfile(userId, key, password);
    }
  } catch (err) { next(err); }
  return response.json({ message: 'Profile updated!' });
};

const updateTag = async (request, response, next) => {
  try {
    const { tag } = request.body;
    const { authorization } = request.headers;
    const userId = jsonWebTokenUtils.getUserId(authorization);

    if (!userId) { throw wrongAuthError; }

    const tagError = UserUtil.validateTag(tag);
    if (tagError.error) return response.status(400).json({ message: 'Invalid tags!' });

    const validateTagsInDb = await userModel.validateTagsInDb(tag);
    if (!validateTagsInDb) {
      return response.status(400).json({ message: 'Invalid tag!' });
    }

    const userTags = await userModel.userHasTags(userId);
    if (userTags) {
      await userModel.deleteRow('usertags', 'uid', userId);
    }

    const query = UserUtil.buildQueryForSavingTags(tag, userId);
    await userModel.saveTags(query);
  } catch (err) { next(err); }
  return response.status(200).json({ message: 'Tags were successfully updated' });
};

export default {
  updateUser,
  updateTag,
};
