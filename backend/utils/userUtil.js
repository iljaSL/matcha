const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendmail = require("../utils/emailUtil");
const { password } = require("./inputUtil");

module.exports = {
  verifyPasswordWithUserId: async (password, id) => {
    const result = await userModel.findUser("id", id);
    if (result) {
      const hashed = result[0]["password"];
      if (bcrypt.compare(password, hashed))
        return { status: "Password is correct" };
      else return { status: "Password is incorrect" };
    }
  },

  getUser: async (data) => {
    const user = data.username;
    const password = data.password;

    if (user.match(/@/)) {
      const result = await userModel.findUser("mail", user);
      console.log(result);
      if (result != "") {
        const hashed = result[0]["password"];
        if (result[0]["status"] == 0)
          return { error: "Account has not been activated yet!" };
        const match = await bcrypt.compare(password, hashed);
        if (match)
          return { message: "Succesfully User Retrieved", userData: result };
        else return { error: "Incorrect username or password." };
      } else return { error: "Incorrect username or password" };
    } else {
      const result = await userModel.findUser("username", user);
      if (result != "") {
        const hashed = result[0]["password"];
        if (result[0]["status"] == 0)
          return { error: "Account has not been activated yet!" };
        const match = await bcrypt.compare(password, hashed);
        if (match)
          return { message: "You are now logged in!", userData: result };
        else return { error: "Incorrect username or password." };
      } else return { error: "Incorrect username or password." };
    }
  },

  createUser: async (data) => {
    const uniqid = (
      new Date().getTime() + Math.floor(Math.random() * 10000 + 1)
    ).toString(16);
    data.push(uniqid);
    const created = await userModel.registerUser(data);
    if (created) {
      const link = "https://localhost:3000/users/register/" + uniqid;
      await sendmail.confirmRegistrationWithEmail(data[3], data[2], link);
      return { status: "User created with success" };
    }
    return { status: "An error has occurred" };
  },
};
