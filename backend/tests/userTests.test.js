import app from '../app.js'
import supertest from 'supertest'
import userTestUtils from './userTestUtils.js'

const request = supertest(app)

describe('user creation and modification', () => {
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
    test('login with valid username & pw', async () => {
        let token = (await request
            .post('/api/login')
            .send({
                "username": userTestUtils.newValidUser.username,
                "password": userTestUtils.newValidUser.password
            })
            .expect(200)).body.token
    })
    test('invalid login', async () => {
      await request
            .post('/api/login')
            .send({
                "username": userTestUtils.newValidUser.username,
                "password": "kalle-Petteri"
            })
            .expect(401)
    })
})

afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
});
