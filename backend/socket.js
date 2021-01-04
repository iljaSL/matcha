import { Server } from 'socket.io';
import chatModel from './models/chatModel.js';

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

  io.on('connection', (socket) => {
    console.log('client connected');
    const time = new Date();
    socket.emit('getTime', time);

    socket.on('setUserData', async (userData) => {
      const { id, username } = userData;
      console.log('getting conversations');
      const conversationList = await chatModel.getConversations(id);
      socket.emit('conversationList', conversationList);
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });

  io.on('sendMessage', (socket) => {
    console.log('trying to send message...');
  });
};
