import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';
import pool from '../config/database';
import truncateAllTables from './testDbUtils';

/* eslint-disable */

const request = supertest(app);

let body1;
let body2;
let token;
let key1;
let key2;


const twoValidUsers = [
  {
    lastname: 'Hirsch',
    firstname: 'Geil',
    username: 'ghirsch',
    mail: 'sdsd@mail.com',
    password: 'Peter123',
  },
  {
    lastname: 'Sehr',
    firstname: 'Geil',
    username: 'geilma',
    mail: 'mdsdail@de.de',
    password: 'Peter123',
  },
];


beforeAll(async () => {
  await truncateAllTables();

  body1 = (await request.post('/api/users/').send(twoValidUsers[0])).body;
  body2 = (await request.post('/api/users/').send(twoValidUsers[1])).body;

  key1 = body1.data.key;
  console.log('KEY 1', key1);
  await request.get(`/api/users/register/${key1}`);

  key2 = body2.data.key;
  await request.get(`/api/users/register/${key2}`);
});

describe('test for reports and blocks', () => {
  test('report user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/report/${userId1}/${userId2}`).expect(200);
  });

  test('report user again, server returns 403', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/report/${userId1}/${userId2}`).expect(403);
  });

  test('report yourself should not be possible, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/report/${userId1}/${userId1}`).expect(400);
  });

  test('checking yourself for reports is not possible, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });

    let userId1 = login1.body.id;

    await request.get(`/api/users/reported/${userId1}/${userId1}`).expect(400);
  });

  // test('no reported user on the db, server returns 204', async () => {
  //   const login1 = await request.post('/api/login').send({
  //     username: twoValidUsers[0].username,
  //     password: twoValidUsers[0].password,
  //   });

  //   let userId1 = login1.body.id;

  //   await request.get(`/api/users/reported/${userId1}/random`).expect(204);
  // });

  test('block user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/block/${userId1}/${userId2}`).expect(200);
  });

  test('block user again, server returns 403', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/block/${userId1}/${userId2}`).expect(403);
  });

  test('report yourself should not be possible, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/block/${userId1}/${userId1}`).expect(400);
  });

  test('check if user is blocked with success, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.get(`/api/users/blocked/${userId1}/${userId2}`).expect(200);
  });

  test('user checks himself, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });

    let userId1 = login1.body.id;

    await request.get(`/api/users/blocked/${userId1}/${userId1}`).expect(400);
  });

  // test('no blocked user on the db, server returns 204', async () => {
  //   const login1 = await request.post('/api/login').send({
  //     username: twoValidUsers[0].username,
  //     password: twoValidUsers[0].password,
  //   });

  //   let userId1 = login1.body.id;

  //   await request.get(`/api/users/blocked/${userId1}/random`).expect(204);
  // });

  test('unblock user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId2}`).expect(200);
  });

  test('unblock user again fails, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });
    const login2 = await request.post('/api/login').send({
      username: twoValidUsers[1].username,
      password: twoValidUsers[1].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId2}`).expect(200);
  });

  test('unblock yourself fails, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: twoValidUsers[0].username,
      password: twoValidUsers[0].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId1}`).expect(400);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});
