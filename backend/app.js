import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userController from './controllers/userController.js';
import userModel from './models/userModel.js';
import userRoute from './routes/userRoute.js';

import middleware from './utils/middleware.js'

const app = express()
app.use(cors());
app.use(express.json())

app.use('/api/users/', userRoute);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app