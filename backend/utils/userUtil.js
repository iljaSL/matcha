import userModel from '../models/userModel.js';
import inputChecker from './inputUtil.js';

const checkUserValidity = (body) => {
  if (Object.keys(body).length !== 5) return false;
  const {
    lastname, firstname, username, mail, password,
  } = body;
  return [inputChecker.realName(lastname), inputChecker.realName(firstname),
    inputChecker.username(username), inputChecker.mail(mail), inputChecker.password(password)]
    .every((value) => value === true);
};

const isDuplicateUser = async (username) => {
  const result = await userModel.findUser('username', username);
  return result.length !== 0;
};

export default {
  checkUserValidity,
  isDuplicateUser,
};
