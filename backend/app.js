import express from 'express';
import cors from 'cors';
import http from 'http';
import mysql from 'mysql';
import bodyParser from 'body-parser';

import userController from './controllers/userController.js';
import userModel from './models/userModel.js';
import userRoute from './routes/userRoute.js';

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users/', userRoute);

export default app