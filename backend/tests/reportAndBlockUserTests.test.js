import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';
import pool from '../config/database';

/* eslint-disable */

const request = supertest(app);

beforeAll(async () => {

});

describe('test for reports', () => {
  test('report user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/report/${userId1}/${userId2}`).expect(200);
  });

  test('report user again, server returns 403', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/report/${userId1}/${userId2}`).expect(403);
  });

  test('report yourself should not be possible, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/report/${userId1}/${userId1}`).expect(400);
  });

  test('block user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/block/${userId1}/${userId2}`).expect(200);
  });

  test('block user again, server returns 403', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/block/${userId1}/${userId2}`).expect(403);
  });

  test('report yourself should not be possible, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/block/${userId1}/${userId1}`).expect(400);
  });

  test('check if user is blocked with success, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.get(`/api/users/blocked/${userId1}/${userId2}`).expect(200);
  });

  test('user checks himself, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });

    let userId1 = login1.body.id;

    await request.get(`/api/users/blocked/${userId1}/${userId1}`).expect(400);
  });

  test('no blocked user on the db, server returns 204', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });

    let userId1 = login1.body.id;

    await request.get(`/api/users/blocked/${userId1}/random`).expect(204);
  });

  test('unblock user, server returns 200', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId2}`).expect(200);
  });

  test('unblock user again fails, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });
    const login2 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[2].username,
      password: userTestUtils.validUsers[2].password,
    });

    let userId1 = login1.body.id;
    let userId2 = login2.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId2}`).expect(400);
  });

  test('unblock yourself fails, server returns 400', async () => {
    const login1 = await request.post('/api/login').send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    });

    let userId1 = login1.body.id;

    await request.post(`/api/users/unblock/${userId1}/${userId1}`).expect(400);
  });
});

afterAll(async () => {
  await pool.query({ sql: 'DELETE FROM report WHERE id' });
  await pool.query({ sql: 'DELETE FROM block WHERE id' });
  await new Promise((resolve) => setTimeout(resolve, 500));
});
