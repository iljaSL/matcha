const express = require("express");
const userController = require("../controllers/userController");

exports.router = (() => {
  let userRouter = express.Router();

  userRouter.route("/register").post(userController.createUser);

  userRouter.route("/login").post(userController.login);

  return userRouter;
})();
