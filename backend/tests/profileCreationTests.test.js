import supertest from 'supertest';
import app from '../app.js';
import truncateAllTables from './testDbUtils.js';
import userTestUtils from './userTestUtils.js';

/* eslint-disable */

const request = supertest(app);

let key; let userId; let
  token;

beforeEach(async () => {
  await truncateAllTables();
  const { body } = (await request
    .post('/api/users/')
    .send(userTestUtils.validUsers[1]));
  key = body.data.key;
  userId = body.data.id;
  await request
    .get(`/api/users/register/${key}`)
    .expect(200);
  token = `Bearer ${(await request
    .post('/api/login')
    .send({
      username: userTestUtils.validUsers[1].username,
      password: userTestUtils.validUsers[1].password,
    })
    .expect(200)).body.token}`;
});

describe('user profile test', () => {
  test('valid profile data returns 201', async () => {
    await request
      .post(`/api/users/profile/${userId}`)
      .send(userTestUtils.validNewProfileForm)
      .set('Authorization', `${token}`)
      .expect(201);
  });
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
});