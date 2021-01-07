import { Server } from 'socket.io';
import chatModel from './models/chatModel.js';
import { initDbListener } from './utils/dbListener.js';

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
      console.log('socket event', msg);
      socket.emit('notification', msg.channel);
    });

    socket.on('setUserData', (userData) => {
      if (interval) {
        clearInterval(interval);
      }
      const { id, username } = userData;
      connections.push({ socketId: socket.id, userId: id });
      console.log(connections);
      try {
        interval = setInterval(async () => {
          const conversationList = await chatModel.getConversations(id);
          socket.emit('conversationList', conversationList);
        }, 1000);
      } catch (err) { socket.emit('my error', 'could not get conversations'); clearInterval(interval); }
    });

    socket.on('newMessage', async (messageData) => {
      if (interval) {
        clearInterval(interval);
      }
      const {
        conversationId, senderId, receiverId, message,
      } = messageData;
      try {
        await chatModel.addMessage(conversationId, senderId, message);
        const conversation = await chatModel.getMessages(conversationId);
        const receiverOnline = connections.find((connection) => connection.userId === receiverId);
        interval = setInterval(async () => {
          socket.emit('conversation', conversation);
          if (receiverOnline) io.to(receiverOnline.socketId).emit('conversation', conversation);
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
          socket.emit('conversation', conversation);
        }, 1000);
      } catch (err) { socket.emit('my error', 'could not get conversation'); clearInterval(interval); }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
      connections = connections.filter((connection) => connection.socketId !== socket.id);
      clearInterval(interval);
    });
  });

  io.on('sendMessage', (socket) => {
    console.log('trying to send message...');
  });
};
