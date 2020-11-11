import inputChecker from './inputUtil.js';
import userModel from '../models/userModel.js';
import sendmail from './emailUtil.js';

const updatePasswordWithResetKey = async (newPassword, key) => {
  const updatedPassword = await userModel.updatePasswordWithResetKey(newPassword, key);
  if (updatedPassword) {
    return { status: 'success' };
  }
  return { status: 'error' };
};

const resetUserPassword = async (data) => {
  const resetId = (
    new Date().getTime() + Math.floor(Math.random() * 1000 + 1)
  ).toString(16);

  const createdId = await userModel.setResetKeyForPassword(data[0].id, resetId);

  if (!createdId) {
    return { status: 'something went wrong' };
  }
  const link = `https://localhost:3000/users/reset-password/${resetId}`;
  await sendmail.emailForForgotPassword(
    data[0].mail,
    data[0].username,
    link,
  );
  return { status: 'email has been sent with the reset link' };
};

const checkIfUsernameExist = async (data) => {
  const user = data.login;
  const result = await userModel.findUser('username', user);
  if (result.length === 0) {
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

export default {
  checkUserValidity,
  checkIfUsernameExist,
  resetUserPassword,
  updatePasswordWithResetKey,
};
