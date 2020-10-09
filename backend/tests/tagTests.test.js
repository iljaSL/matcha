import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';

/* eslint-disable */

const request = supertest(app);

let id
let tag
let token
let userid

beforeAll(async () => {
    await request
        .post('/api/users/')
        .send(userTestUtils.validUsers[0])
    userid = await request
        .post('/api/users/')
        .send(userTestUtils.validUsers[1])
     token = (await request
        .post('/api/login')
        .send({
            username: userTestUtils.validUsers[0].username,
            password: userTestUtils.validUsers[0].password,
        })
        .expect(200)).body.token;
})

describe('tests for tags', () => {
    test('tag creation returns 201', async () => {
       id = (await request
            .post('/api/tags')
            .send({"tag" : Math.random().toString(36).substring(7)})
            .expect(201)).body.id
        expect(id).toBeDefined;
    })
    test('tag getter', async () => {
        if (!id)
            id = 1
        tag = (await request.get(`/api/tags/${id}`)
            .expect(200)).body.tag
    })
    test('usertag addition returns 201', async () => {
        await request
            .post(`/api/users/tags/${id}`)
            .set('Authorization', `${token}`)
            .expect(201)
    })
    test('usertag deletion with auth', async () => {
        await request
            .delete(`/api/users/tags/${id}`)
            .set('Authorization', `${token}`)
            .expect(200)
    })
})

afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
});