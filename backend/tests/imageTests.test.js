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
import pool from '../config/database';

/* eslint-disable */
dotenv.config();

const request = supertest(app);
let id, token, tag, userId, images, key
const imagePath = process.env.IMAGE_PATH;


beforeAll(async () => {
    await truncateAllTables();
    const { body } = (await request
        .post('/api/users/')
        .send(userTestUtils.validUsers[1]))
    key  = body.data.key;
    userId = body.data.id
    await request
        .get(`/api/users/register/${key}`)
        .expect(200);
    token = 'Bearer ' + ((await request
        .post('/api/login')
        .send({
            username: userTestUtils.validUsers[1].username,
            password: userTestUtils.validUsers[1].password,
        })
        .expect(200)).body.token);
})

describe('image upload tests', () => {
    test('valid png upload adds file to server and a link to db', async () => {
        images = await imageModel.getUserImages(userId)
        let returnValue = (await request
                .post(`/api/images/${userId}`)
                .set('Authorization', `${token}`)
                .send(imageTestUtils.validPNG)
                .expect(200)
        )
        const savedPath = (new URL(`http://localhost:3001/${returnValue.body}`)).pathname;
        expect(fs.existsSync(`${process.cwd()}${savedPath}`)).toBe(true)

        const newImages = await imageModel.getUserImages(userId)
        expect(newImages.length).toBe(images.length + 1)
    })
    test('valid jpg upload adds file to server and a link to db', async () => {
        images = await imageModel.getUserImages(userId)
        let returnValue = (await request
                .post(`/api/images/${userId}`)
                .set('Authorization', token)
                .send(imageTestUtils.validJPG)
                .expect(200)
        )
        const savedPath = (new URL(`http://localhost:3001/${returnValue.body}`)).pathname;
        expect(fs.existsSync(`${process.cwd()}${savedPath}`)).toBe(true)
        const newImages = await imageModel.getUserImages(userId)
        expect(newImages.length).toBe(images.length + 1)
    })
    test('invalid filetype upload returns 400', async () => {
        await request
                .post(`/api/images/${userId}`)
                .send(imageTestUtils.invalidFormatGIF)
                .set('Authorization', token)
                .expect(400)
    })
    test('file uploading with no auth returns 401', async () => {
        await request
            .post(`/api/images/${userId}`)
            .send(imageTestUtils.validPNG)
            .expect(401)
    })
    test('file uploading with empty file returns 401', async () => {
        await request
            .post(`/api/images/${userId}`)
            .expect(401)
    })
})

afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
});