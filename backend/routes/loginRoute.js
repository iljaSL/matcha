import userController from "../controllers/userController.js";
import express from 'express'

const loginRouter = express.Router()

loginRouter.route('/').post(userController.login);

export default loginRouter