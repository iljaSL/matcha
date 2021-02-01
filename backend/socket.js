import { Server } from 'socket.io';
import chatModel from './models/chatModel.js';
import { initDbListener } from './utils/dbListener.js';
import userModel from './models/userModel.js';

export const webSocketServer = (server) => {
  const dbListener = initDbListener();

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  let interval;
  let connections = [];

  io.on('connection', (socket) => {
    if (interval) {
      clearInterval(interval);
    }

    dbListener.on('notification', async (msg) => {
      const payload = JSON.parse(msg.payload);
      const currentConnection = connections.find((connection) => connection.userId === payload.uid);
      if (currentConnection) {
        const notificationCount = await userModel.getUserNotificationCount(payload.uid);
        io.to(currentConnection.socketId).emit('notification', { ...payload, ...notificationCount });
      }
    });

    socket.on('setUserData', async (userData) => {
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
        const notificationCount = await userModel.getUserNotificationCount(id);
        const unreadMessages = await chatModel.getUnreadMessages(id);
        socket.emit('unreadMessages', unreadMessages.count);
        socket.emit('unreadNotifications', notificationCount);
      } catch (err) { socket.emit('my error', 'could not get conversations'); clearInterval(interval); }
    });

    socket.on('newMessage', async (messageData) => { // TODO: rethink intervals on each listener...
      const {
        conversationId, senderId, receiverId, message,
      } = messageData;
      try {
        await chatModel.addMessage(conversationId, senderId, receiverId, message);
        const conversation = await chatModel.getMessages(senderId, conversationId);
        const receiverOnline = connections.find((connection) => connection.userId === parseInt(receiverId, 10));
        socket.emit('conversation', { conversationId, conversation });
        if (receiverOnline) {
          io.to(receiverOnline.socketId).emit('conversation', { conversationId, conversation });
          const unreadMessages = await chatModel.getUnreadMessages(receiverId);
          io.to(receiverOnline.socketId).emit('unreadMessages', unreadMessages.count);
        }
      } catch (err) { socket.emit('my error', 'could not add message'); clearInterval(interval); }
    });

    socket.on('getConversation', async (conversationData) => {
      const { userId, conversationId } = conversationData;
      try {
        const conversation = await chatModel.getMessages(userId, conversationId);
        socket.emit('conversation', { conversationId, conversation });
        const unreadMessages = await chatModel.getUnreadMessages(userId);
        socket.emit('unreadMessages', unreadMessages.count);
      } catch (err) { socket.emit('my error', 'could not get conversation'); clearInterval(interval); }
    });

    socket.on('disconnect', () => {
      connections = connections.filter((connection) => connection.socketId !== socket.id);
      clearInterval(interval);
    });
  });
};
