import supertest from 'supertest';
import dotenv from 'dotenv';
import fs from 'fs';
import { URL } from 'url';
import app from '../app.js';
import userTestUtils from './userTestUtils';
import imageTestUtils from './imageTestUtils';
import imageModel from '../models/imageModel';
import truncateAllTables from './testDbUtils';
import userModel from '../models/userModel';

/* eslint-disable */
dotenv.config();

const request = supertest(app);
let id, token, tag, userId, images
const imagePath = process.env.IMAGE_PATH;

beforeAll(async () => {
    await truncateAllTables();
    userId = (await request
        .post('/api/users/')
        .send(userTestUtils.validUsers[2])).body.id
})

describe('image upload tests', () => {
    beforeEach(async () => {
        token = 'Bearer ' + ((await request
            .post('/api/login')
            .send({
                username: userTestUtils.validUsers[2].username,
                password: userTestUtils.validUsers[2].password,
            })
            .expect(200)).body.token);
    })
    test('valid png upload adds file to server', async () => {
        let returnValue = (await request
                .post(`/api/images/${userId}`)
                .set('Authorization', `${token}`)
                .send(imageTestUtils.validPNG)
                .expect(200)
        )
        const savedPath = (new URL(returnValue.body)).pathname;
        expect(fs.existsSync(`${process.cwd()}${savedPath}`)).toBe(true)
    })
    test('valid jpg upload adds file to server', async () => {
        let returnValue = (await request
                .post(`/api/images/${userId}`)
                .set('Authorization', token)
                .send(imageTestUtils.validJPG)
                .expect(200)
        )
        const savedPath = (new URL(returnValue.body)).pathname;
        expect(fs.existsSync(`${process.cwd()}${savedPath}`)).toBe(true)
    })
    test('invalid filetype upload returns 400', async () => {
        await request
                .post(`/api/images/${userId}`)
                .send(imageTestUtils.invalidFormatGIF)
                .set('Authorization', token)
                .expect(400)
    })
})
describe('image link posting', () => {
    beforeEach(async () => {
        token = 'Bearer ' + ((await request
            .post('/api/login')
            .send({
                username: userTestUtils.validUsers[2].username,
                password: userTestUtils.validUsers[2].password,
            })
            .expect(200)).body.token);
    })
    test('valid http link added to database', async () => {
        for (const image of imageTestUtils.validLinks)
        {
            images = await imageModel.getUserImages(userId)
            await request
                .post(`/api/images/${userId}`)
                .send(imageTestUtils.validLinks[1])
                .set('Authorization', token)
                .expect(200)
        const newImages = await imageModel.getUserImages(userId)
        expect(newImages.length).toBe(images.length + 1)
        }
    })
    test('invalid link returns 400', async () => {
            await request
                .post(`/api/images/${userId}`)
                .send(imageTestUtils.invalidLinks[1])
                .set('Authorization', token)
                .expect(400)
    })
})




afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
});