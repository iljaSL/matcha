import { Server } from 'socket.io';
import chatModel from './models/chatModel.js';

export const webSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  let interval;

  io.on('connection', (socket) => {
    if (interval) {
      clearInterval(interval);
    }

    console.log('client connected');
    const time = new Date();
    socket.emit('getTime', time);

    socket.on('setUserData', async (userData) => {
      const { id, username } = userData;
      try {
        const conversationList = await chatModel.getConversations(id);
        interval = setInterval(() => {
          socket.emit('conversationList', conversationList);
        }, 2000);
      } catch (err) { socket.emit('my error', 'could not get conversations'); }
    });

    socket.on('newMessage', async (messageData) => {
      if (interval) {
        clearInterval(interval);
      }
      const { conversationId, senderId, message } = messageData;
      try {
        await chatModel.addMessage(conversationId, senderId, message);
      } catch (err) { socket.emit('my error', 'could not add message'); }
    });

    socket.on('getConversation', async (conversationId) => {
      if (interval) {
        clearInterval(interval);
      }
      try {
        const conversation = await chatModel.getMessages(conversationId);
        interval = setInterval(() => {
          socket.emit('conversation', conversation);
        }, 2000);
      } catch (err) { socket.emit('my error', 'could not get conversation'); }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
      clearInterval(interval);
    });
  });

  io.on('sendMessage', (socket) => {
    console.log('trying to send message...');
  });
};
