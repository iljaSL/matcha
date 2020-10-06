import app from '../app.js'
import supertest from 'supertest'
import userTestUtils from './userTestUtils.js'

const request = supertest(app)

// TODO: should drop the test database here to start w/ a blank slate?

beforeAll(() => {
    // drop table users
})

describe('user creation and modification', () => {
    test('normal user creation returns 201', async () => {
       const response = await request
            .post('/api/users/')
            .send(userTestUtils.newValidUser)
            .expect(201)
    })
    test('user creation with missing values returns 400', async () => {
        await request
            .post('/api/users/')
            .send(userTestUtils.newUserMissingValues)
            .expect(400)
    })
    test('dupliate username on creation returns 409', async () => {
        const response = await request
            .post('/api/users/')
            .send(userTestUtils.newValidUser)
            .expect(409)
    })

    test('login with valid username & pw returns 200', async () => {
        let token = (await request
            .post('/api/login')
            .send({
                "username": userTestUtils.newValidUser.username,
                "password": userTestUtils.newValidUser.password
            })
            .expect(200)).body.token
    })
    test('invalid login returns 401', async () => {
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
