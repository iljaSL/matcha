import express from 'express';
import cors from 'cors';
import http from 'http';
import mysql from 'mysql';
import bodyParser from 'body-parser';

import userController from './controllers/userController.js';
import userModel from './models/userModel.js';
import userRoute from './routes/userRoute.js';

const app = express()
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

server.listen(PORT, () => {
	console.log('Listening on port: ', PORT);
});

app.use('/api/users/', userRoute);
