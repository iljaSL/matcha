import { Server } from 'socket.io';
import chatModel from './models/chatModel.js';
import { initDbListener } from './utils/dbListener.js';
import imageModel from './models/imageModel.js';

const getTime = () => new Date();

export const webSocketServer = (server) => {
  const dbListener = initDbListener();

  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  let interval;
  let connections = [];

  io.on('connection', (socket) => {
    if (interval) {
      clearInterval(interval);
    }

    dbListener.on('notification', (msg) => {
      const payload = JSON.parse(msg.payload);
      const currentConnection = connections.find((connection) => connection.userId === payload.uid);
      if (currentConnection) {
        io.to(currentConnection.socketId).emit('notification', payload);
      }
    });

    socket.on('setUserData', (userData) => {
      if (interval) {
        clearInterval(interval);
      }
      const { id, username } = userData || {};
      connections.push({ socketId: socket.id, userId: parseInt(id, 10) });
      try {
        interval = setInterval(async () => {
          const conversationList = await chatModel.getConversations(id);
          socket.emit('conversationList', conversationList);
        }, 1000);
      } catch (err) { socket.emit('my error', 'could not get conversations'); clearInterval(interval); }
    });

    socket.on('newMessage', async (messageData) => { // TODO: rethink intervals on each listener...
      if (interval) {
        clearInterval(interval);
      }
      const {
        conversationId, senderId, receiverId, message,
      } = messageData;
      try {
        await chatModel.addMessage(conversationId, senderId, receiverId, message);
        const conversation = await chatModel.getMessages(conversationId);
        const receiverOnline = connections.find((connection) => connection.userId === receiverId);
        interval = setInterval(async () => {
          socket.emit('conversation', { conversationId, conversation });
          if (receiverOnline) io.to(receiverOnline.socketId).emit('conversation', { conversationId, conversation });
        }, 1000);
      } catch (err) { socket.emit('my error', 'could not add message'); clearInterval(interval); }
    });

    socket.on('getConversation', (conversationId) => {
      if (interval) {
        clearInterval(interval);
      }
      try {
        interval = setInterval(async () => {
          const conversation = await chatModel.getMessages(conversationId);
          socket.emit('conversation', { conversationId, conversation });
        }, 1000);
      } catch (err) { socket.emit('my error', 'could not get conversation'); clearInterval(interval); }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
      connections = connections.filter((connection) => connection.socketId !== socket.id);
      clearInterval(interval);
    });
  });
};
