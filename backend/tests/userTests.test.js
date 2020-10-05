import app from '../app.js'
import supertest from 'supertest'
import userTestUtils from './userTestUtils.js'

const request = supertest(app)

describe('user creation and modification',  () => {
    test('normal user creation', async () => {
        await request
            .post('/api/users/')
            .send(userTestUtils.newValidUser)
            .expect(201)
    })
    test('invalid user creation', async () => {
        await request
            .post('/api/users/')
            .send(userTestUtils.newUserMissingValues)
            .expect(400)
    })
})

afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
});
