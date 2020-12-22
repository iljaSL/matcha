import supertest from 'supertest';
import app from '../app.js';
import truncateAllTables from './testDbUtils.js';
import userTestUtils from './userTestUtils';

const request = supertest(app);

let key1; let key2; let key3; let body1; let
  body2; let body3; let userId1; let userId2; let userId3;
let login1; let token1;
let login2; let token2;
let login3; let token3;

beforeAll(async () => {
  await truncateAllTables();

  body1 = (await request.post('/api/users/').send(userTestUtils.validUsers[0])).body;
  body2 = (await request.post('/api/users/').send(userTestUtils.validUsers[1])).body;
  body3 = (await request.post('/api/users/').send(userTestUtils.validUsers[2])).body;

  key1 = body1.data.key;
  await request.get(`/api/users/register/${key1}`);

  key2 = body2.data.key;
  await request.get(`/api/users/register/${key2}`);

  key3 = body2.data.key;
  await request.get(`/api/users/register/${key3}`);

  login1 = (await request.post('/api/login').send({
    username: userTestUtils.validUsers[0].username,
    password: userTestUtils.validUsers[0].password,
  })).body;
  token1 = `Bearer ${login1.token}`;

  login2 = (await request.post('/api/login').send({
    username: userTestUtils.validUsers[1].username,
    password: userTestUtils.validUsers[1].password,
  })).body;
  token2 = `Bearer ${login1.token}`;

  login3 = (await request.post('/api/login').send({
    username: userTestUtils.validUsers[2].username,
    password: userTestUtils.validUsers[2].password,
  })).body;
  token3 = `Bearer ${login1.token}`;

  request
    .post('/api/users/location')
    .send({ long: 69, lat: 69 })
    .set('Authorization', `${token1}`)
    .expect(200);

  request
    .post('/api/users/location')
    .send({ long: 69, lat: 69 })
    .set('Authorization', `${token2}`)
    .expect(200);

  request
    .post('/api/users/location')
    .send({ long: 69, lat: 69 })
    .set('Authorization', `${token3}`)
    .expect(200);
});

describe('tests for user profile display and matching', () => {
  test('lists some profiles with GET /api/matches/', async () => {
    const response = await request
      .get('/api/matches')
      .set('Authorization', `${token1}`)
      .expect(200);
  });
});
