import supertest from 'supertest';
import MockedSocket from 'socket.io-mock';
import app from '../app.js';

const request = supertest(app);
const socket = new MockedSocket();

describe('socket tests', () => {
  test('init', () => {
    console.log(socket.socketClient.connected);
  });
});
