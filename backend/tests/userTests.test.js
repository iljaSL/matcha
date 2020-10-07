import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';

/* eslint-disable */

const request = supertest(app);
let token;

// TODO: should drop the test database here to start w/ a blank slate?

beforeAll(() => {
  // drop table users
});

describe('user creation and modification', () => {
  test('normal user creation returns 201', async () => {
    await request
      .post('/api/users/')
      .send(userTestUtils.newValidUser)
      .expect(201);
  });
  test('user creation with missing values returns 400', async () => {
    await request
      .post('/api/users/')
      .send(userTestUtils.newUserMissingUsername)
      .expect(400);
  });
  test('duplicate username on creation returns 409', async () => {
    await request
      .post('/api/users/')
      .send(userTestUtils.newValidUser)
      .expect(409);
  });

  test('login with valid username & pw returns 200', async () => {
    const { token } = (await request
      .post('/api/login')
      .send({
        username: userTestUtils.newValidUser.username,
        password: userTestUtils.newValidUser.password,
      })
      .expect(200)).body;
  });
  test('invalid login returns 401', async () => {
    await request
      .post('/api/login')
      .send({
        username: userTestUtils.newValidUser.username,
        password: 'kalle-Petteri',
      })
      .expect(401);
  });
  test('invalid users should return 400', () => {
      userTestUtils.invalidUsers.forEach(async invalidUser => {
          await request
              .post('/api/users/')
              .send(invalidUser)
              .expect(400)
      })
  })
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
});
