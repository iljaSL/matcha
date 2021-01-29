/* eslint-disable */
import faker from 'faker';
import pool from './database.js';
import axios from 'axios';
import imageModel from "../models/imageModel.js";
import dotenv from 'dotenv'

dotenv.config({path: '../'})


const initFakeUsers = async () => {

    let statement = 'INSERT INTO users (lastname, firstname, username, gender, sexual_orientation, mail, bio, geo_lat, geo_long, status, password) VALUES';
    let ids = [];
    const gender = ['woman', 'man', 'other'];
    const sexualOrientation = ['androsexual', 'gynesexual', 'pansexual'];
    await new Promise(r => setTimeout(r, 1000)); // sleep to connect to db.. lol
    console.log('inserting fake users...')

    for (let i = 0; i < 500; i++) {
        statement = statement + `(
            '${faker.name.lastName().replace('\'', '')}',
            '${faker.name.firstName().replace('\'', '')}',
            '${faker.internet.userName()}',
            '${gender[Math.floor(Math.random() * 3)]}',
            '${sexualOrientation[Math.floor(Math.random() * 3)]}',
            '${faker.internet.email()}',
            '${faker.lorem.sentence()}',
            '${faker.address.latitude()}',
            '${faker.address.longitude()}',
             2, 'fake'
            )`
        if (i < 499) statement += ','
    }
    statement = statement + ' RETURNING id;'
    ids = ((await pool.query(statement)).rows)
        .map(entry => parseInt(entry.id));
    console.log('done!')

    statement = ''
    console.log('inserting fake profile pictures...')
   await Promise.all(ids.map(async id => {
        const image = await axios.get(faker.image.cats(300, 300), {responseType: 'arraybuffer'});
        const base64Image = `data:image/jpeg;base64,${Buffer.from(image.data, 'binary').toString('base64')}`
        let link = `${await imageModel.saveImageBlob(id, base64Image)}`;
        const imageId = await imageModel.addImageLink(id, link);
        statement = statement + `UPDATE users SET profile_picture_id = ${imageId} WHERE id = ${id};`
    }))
    await pool.query(statement);
    console.log('done!')
    console.log('inserted', ids.length, 'entries')
    statement = ''

    console.log('adding likes...')
    ids.map(id => {
        let randomId = ids[Math.floor(Math.random() * ids.length)];
        let randomId2 = ids[Math.floor(Math.random() * ids.length)];
        if (randomId === randomId2) randomId = ids[Math.floor(Math.random() * ids.length)];
        statement = statement + `INSERT INTO likes (user1, user2) VALUES (${id}, ${randomId});`
        statement = statement + `INSERT INTO likes (user1, user2) VALUES (${id}, ${randomId2});`
    })
    await pool.query(statement);
    console.log('done!')

    console.log('adding tags...');
    statement = `INSERT INTO tags (tag) 
        VALUES ('vegan'), ('bodybuilding'), ('yoga'), ('design'), ('coffee'), ('programming'), ('cybersecurity') 
        RETURNING id;`
    const tagIds = (await pool.query(statement)).rows;
    if (tagIds.length !== 7) console.log(tagIds.length)

    statement = '';

    ids.map(id => {
        let randomTag = tagIds[Math.floor(Math.random() * tagIds.length)];
        let randomTag2 = tagIds[Math.floor(Math.random() * tagIds.length)];
        statement = statement + `INSERT INTO usertags (uid, tagid) VALUES (${id}, ${randomTag.id});`
        if (randomTag.id !== randomTag2.id)
            statement = statement + `INSERT INTO usertags (uid, tagid) VALUES (${id}, ${randomTag2.id});`
    })
    await pool.query(statement);
    console.log('done!')

}

initFakeUsers()
    .then(() => {console.log('initialization done!'); return 0})













