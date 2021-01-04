import { Server } from 'socket.io';
import pool from './config/database.js';

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

export const webSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  let interval;

  io.on('connection', (socket) => {
    console.log('client connected');
    getApiAndEmit(socket);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(interval);
    });
  });
  io.on('sendMessage', (socket) => {
    console.log('trying to send message...');
  });
};
