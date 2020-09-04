const userModel = require("../models/userModel");

module.exports = {
  createUser: async (data) => {
    const uniqid = (
      new Date().getTime() + Math.floor(Math.random() * 10000 + 1)
    ).toString(16);
    data.push(uniqid);
    const created = await userModel.registerUser(data);
    if (created) {
      return { status: "User created with success" };
    }
    return { status: "An error has occurred" };
  },
};
