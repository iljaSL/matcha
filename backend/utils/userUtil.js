const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
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
      // For Email auth later on
      // const link = "https://localhost:3000/users/register/" + uniqid;
      // await sendmail.registerMail(data[3], data[2], link);
      return { status: "User created with success" };
    }
    return { status: "An error has occurred" };
  },
};
