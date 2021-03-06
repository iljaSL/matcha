/* eslint-disable prefer-const */
import bcrypt from 'bcrypt';
import inputChecker from './inputUtil.js';
import userModel from '../models/userModel.js';
import sendmail from './emailUtil.js';

const validatePassword = (password) => {
  let errors = {};
  if (!password) {
    errors.passwordError = 'Required field';
  } else if (!inputChecker.password(password)) {
    errors.passwordError = 'Password must contain at least 1 uppercase, 1 lowercase letter and 1 number';
  }
  return errors;
};

const checkPassword = async (userId, password, username = null) => {
  let user;

  if (userId) {
    user = await userModel.findUserInfo('id', userId, 'password');
  } else {
    user = await userModel.findUserInfo('username', username, 'password');
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return false;
  }
  return true;
};

const validateMail = (mail) => {
  let errors = {};

  if (!mail) {
    errors.mailError = 'No Input provided';
  } else if (mail.length > 255) {
    errors.mailError = 'Email is to long';
  } else if (!inputChecker.mail(mail)) {
    errors.mailError = 'Invalid email';
  }
  return errors;
};

const validateOrientation = (orientation) => {
  let errors = {};

  if (!orientation) {
    errors.orientationError = 'No input provided';
  } else if (!['gynesexual', 'pansexual', 'androsexual'].includes(orientation)) {
    errors.orientationError = 'Orientations available: gynesexual, pansexual, androsexual';
  }
  return errors;
};

const validateGender = (gender) => {
  let errors = {};

  if (!gender) {
    errors.genderError = 'No gender provided';
  } else if (!['man', 'woman', 'other'].includes(gender)) {
    errors.genderError = 'Available genders man, woman, other';
  }
  return errors;
};

const validateBio = (bio) => {
  let errors = {};

  if (!bio) {
    errors.bioError = 'No Bio provided';
  }
  if (bio.length > 255) {
    errors.bioError = 'Bio to long';
  }
  return errors;
};

const validateName = (name) => {
  let errors = {};

  if (!name) {
    errors.message = 'Required field';
  } else if (!inputChecker.realName(name)) {
    errors.message = 'Name is not valid';
  }
  return errors;
};

const updatePasswordWithResetKey = async (newPassword, key) => {
  const updatedPassword = await userModel.updatePasswordWithResetKey(newPassword, key);
  if (updatedPassword) {
    return { status: 'success' };
  }
  return { status: 'error' };
};

const resetUserPassword = async (data, next) => {
  const resetId = (
    new Date().getTime() + Math.floor(Math.random() * 1000 + 1)
  ).toString(16);
  const createdId = await userModel.setResetKeyForPassword(data.id, resetId, next);

  if (!createdId) {
    return { status: 'something went wrong' };
  }
  const link = `http://localhost:3000/reset-password/${resetId}`;
  await sendmail.emailForForgotPassword(
    data.mail,
    data.username,
    link,
  );
  return { status: 'email has been sent with the reset link' };
};

const checkIfUsernameExist = async (data) => {
  const user = data.username;
  const result = await userModel.findUser(user);
  if (result === undefined) {
    return { error: 'user does not exist' };
  } return { message: 'user exists', userData: result };
};

const checkUserValidity = (body) => {
  if (Object.keys(body).length !== 5) return false;
  const {
    lastname, firstname, username, mail, password,
  } = body;
  return [inputChecker.realName(lastname), inputChecker.realName(firstname),
    inputChecker.username(username), inputChecker.mail(mail), inputChecker.password(password)]
    .every((value) => value === true);
};

// eslint-disable-next-line no-nested-ternary
const getOrientation = (gender, preferences) => {
  if (preferences.includes('other') || (preferences.includes('man') && preferences.includes('woman'))) return 'pansexual';
  if (gender === 'man') return 'androsexual';
  return 'gynesexual';
};

const validateTag = async (tags) => {
  let errors = {};
  if (!tags) {
    errors.tagError = 'please pick a tag';
  } else if (tags.length > 7) {
    errors.tagError = '7 tags is the limit!';
  } else if (!(await userModel.validateTagsInDb(tags))) {
    errors.tagError = 'invalid tags';
  }
  return errors;
};

const buildQueryForSavingTags = (tags, id) => {
  let query = {
    values: [],
    placeholder: '',
  };
  // eslint-disable-next-line no-restricted-syntax
  for (const element of tags) {
    query.values.push(id);
    query.values.push(element);
  }
  query.placeholder = '';
  let i = 1;
  let { length } = tags;
  while (length > 0) {
    let j = i + 1;
    query.placeholder += `($${i},(SELECT id FROM tags WHERE tag = $${j}))`;
    if (length !== 1) query.placeholder += ',';
    i += 2;
    length -= 1;
  }
  return query;
};

export default {
  checkUserValidity,
  checkIfUsernameExist,
  resetUserPassword,
  updatePasswordWithResetKey,
  getOrientation,
  validateName,
  validateBio,
  validateGender,
  validateOrientation,
  validateMail,
  checkPassword,
  validatePassword,
  validateTag,
  buildQueryForSavingTags,
};
