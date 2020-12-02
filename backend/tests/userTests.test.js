import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';
import pool from '../config/database';
import truncateAllTables from './testDbUtils';
import userRouter from '../routes/userRoute';

/* eslint-disable */
let body;
let token;
let key;

const request = supertest(app);

// TODO: should drop the test database here to start w/ a blank slate?

beforeAll(async () => {
    await truncateAllTables();
});

describe('user creation and modification', () => {
  test('normal user creation returns 201', async () => {
    body = (await request
      .post('/api/users/')
      .send(userTestUtils.newValidUser)
      .expect(201)).body;
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

    test('login with valid username & pw, but no validation, server should return 401', async () => {
        const { token } = (await request
            .post('/api/login')
            .send({
                username: userTestUtils.newValidUser.username,
                password: userTestUtils.newValidUser.password,
            })
            .expect(401)).body;
    });

    test('wrong validation key, server should response with 404', async () => {
        await request.get('/register/w4r6o65ng').expect(404);
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

    test('validation returns 200', async () => {
        key = body.data.key;
        await request
            .get(`/api/users/register/${key}`)
            .expect(200);
		});


    test('login with valid username & pw returns 200', async () => {
     token = (await request
          .post('/api/login')
          .send({
              username: userTestUtils.newValidUser.username,
              password: userTestUtils.newValidUser.password,
          })
          .expect(200)).body.token;
    });

  test('invalid users should return 400', () => {
      userTestUtils.invalidUsers.forEach(async invalidUser => {
          await request
              .post('/api/users/')
              .send(invalidUser)
              .expect(400)
      })
  });

  test ('delete user should return 401, with a wrong token', async () => {
      let login = await request.post('/api/login').send({
          username: userTestUtils.newValidUser.username,
          password: userTestUtils.newValidUser.password,
      });
      let wrongToken = userTestUtils.wrongToken;
      let userId = login.body.id;

      await request.delete(`/api/users/${userId}`).set('Authorization', `${wrongToken}`).expect(401)
  })

    test ('delete user should return 401, no token used',async () => {
        let login = await request.post('/api/login').send({
            username: userTestUtils.newValidUser.username,
            password: userTestUtils.newValidUser.password,
        });
        let userId = login.body.id;

        await request.delete(`/api/users/${userId}`).expect(401)
    });

    test('forgot-password route should find user and return 200', async () => {
        await request
            .post('/api/users/forgot-password')
            .send({
                login: userTestUtils.newValidUser.username,
            })
            .expect(200);
    });

  test('forgot-password route should return 404 with wrong login', async () => {
        await request
            .post('/api/users/forgot-password')
            .send({
                login: 'plust',
            })
            .expect(404);
    });

    test('reset-password route should find user and return 200', async () => {
        let resetKey = (await pool.query(
           `SELECT reset_password_key FROM users WHERE username LIKE '${userTestUtils.newValidUser.username}'`
        )).rows[0].reset_password_key;
        await request
            .get(`/api/users/reset-password/${resetKey}`)
            .expect(200);
    });

    test('reset-password route should not find invalid user and return 404', async () => {
        await request
            .get(`/api/users/reset-password/427427241`)
            .expect(404);
    });

    test('reset-password route update password, should return 201', async () => {
        let resetKey = (await pool.query(
           `SELECT reset_password_key FROM users WHERE username LIKE '${userTestUtils.newValidUser.username}'`
        )).rows[0].reset_password_key;
        await request
            .post(`/api/users/reset-password/${resetKey}`).send({
                new_password: "Peter123",
                repeat_password: "Peter123"
            })
            .expect(201);
    });

    test('reset-password route, passwords do not match, expect 400', async () => {
        let resetKey = (await pool.query(
            `SELECT reset_password_key FROM users WHERE username LIKE '${userTestUtils.newValidUser.username}'`
        )).rows[0].reset_password_key;
        await request
            .post(`/api/users/reset-password/${resetKey}`).send({
                new_password: "Peter12",
                repeat_password: "Peter123"
            })
            .expect(400);
    });

  test ('delete user should return 200',async () => {
      let login = await request.post('/api/login').send({
          username: userTestUtils.newValidUser.username,
          password: userTestUtils.newValidUser.password,
      });
      let token = login.body.token;
      let userId = login.body.id;

      await request.delete(`/api/users/${userId}`).set('Authorization', `${token}`).expect(200)
  })
});


afterAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
});
