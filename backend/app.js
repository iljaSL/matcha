import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from './routes/userRoute.js';
import loginRoute from './routes/loginRoute.js';
import tagRoute from './routes/tagRoute.js';
import imageRoute from './routes/imageRoute.js';

import middleware from './utils/middleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: 100000000 }));

app.use(middleware.tokenExtractor);

app.use('/api/users', userRoute);
app.use('/api/login', loginRoute);
app.use('/api/tags', tagRoute);
app.use('/api/images', imageRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
