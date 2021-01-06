import http from 'http';
import app from './app.js';
import { webSocketServer } from './socket.js';
import dbListener from './utils/dbListener.js';

const server = http.createServer(app);

const { PORT } = process.env;

webSocketServer(server);


server.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});
