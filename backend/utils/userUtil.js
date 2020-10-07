import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import sendmail from './emailUtil.js';
import inputChecker from './inputUtil.js';

function checkUserValidity(body) {
  if (Object.keys(body).length !== 5) return false;
  const {
    lastname, firstname, username, mail, password,
  } = body;
  return [inputChecker.realName(lastname), inputChecker.realName(firstname),
    inputChecker.username(username), inputChecker.mail(mail), inputChecker.password(password)]
    .every((value) => value === true);
}

async function isDuplicateUser(username) {
  const result = await userModel.findUser('username', username);
  return result.length !== 0;
}

export default {
  checkUserValidity,
  isDuplicateUser,

  verifyPasswordWithUserId: async (password, id) => {
    const result = await userModel.findUser('id', id);
    if (result.length > 0) {
      const hashed = result[0].password;
      const match = await bcrypt.compare(password, hashed);
      if (match) return { status: 'Password is correct' };
      return { status: 'Password is incorrect' };
    }
  },

  getUser: async (data) => {
    const user = data.username;
    const { password } = data;

    if (user.match(/@/)) {
      const result = await userModel.findUser('mail', user);
      if (result !== '') {
        const hashed = result[0].password;
        if (result[0].status === 0) return { error: 'Account has not been activated yet!' };
        const match = await bcrypt.compare(password, hashed);
        if (match) return { message: 'Succesfully User Retrieved', userData: result };
        return { error: 'Incorrect username or password.' };
      } return { error: 'Incorrect username or password' };
    }
    const result = await userModel.findUser('username', user);
    if (result !== '') {
      const hashed = result[0].password;
      if (result[0].status === 0) return { error: 'Account has not been activated yet!' };
      const match = await bcrypt.compare(password, hashed);
      if (match) return { message: 'You are now logged in!', userData: result };
      return { error: 'Incorrect username or password.' };
    } return { error: 'Incorrect username or password.' };
  },

};
