import supertest from 'supertest';
import app from '../app.js';
import userTestUtils from './userTestUtils.js';

/* eslint-disable */

const request = supertest(app);

describe('tests for tags'), () => {
    test('tag creation returns 201'), async () => {
        await request
            .post('/api/tags')
            .send({"tag" : "test"})
            .expect(201)
    }
}