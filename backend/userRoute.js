const express = require("express");
const userController = require("./controllers/userController");

exports.router = (() => {
  var userRouter = express.Router();

  userRouter.route("/register").post(userController.createUser);

  return userRouter;
})();
