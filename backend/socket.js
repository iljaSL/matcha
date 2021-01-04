import { Server } from 'socket.io';
import pool from './config/database.js';

export const webSocketServer = (server) => {
  const io = new Server(server);
  io.on('connection', () => console.log('user connected'));
};
