/* eslint-disable */
import faker from 'faker';
import pool from './database.js';
import axios from 'axios';
import imageModel from "../models/imageModel.js";
import dotenv from 'dotenv'

dotenv.config()


const initFakeUsers = async () => {

    let statement;
    let ids = [];
    const gender = ['woman', 'man', 'other'];
    const sexualOrientation = ['heterosexual', 'bisexual', 'homosexual'];
    await new Promise(r => setTimeout(r, 1000)); // sleep to connect to db.. lol
    console.log('inserting fake users...')

    for (let i = 0; i < 500; i++) {
        statement = `INSERT INTO users (lastname, firstname, username, gender, sexual_orientation, mail, bio, geo_lat, geo_long, status, password)
            VALUES (
            '${faker.name.lastName().replace('\'', '')}',
            '${faker.name.firstName().replace('\'', '')}',
            '${faker.internet.userName()}',
            '${gender[Math.floor(Math.random() * 2)]}',
            '${sexualOrientation[Math.floor(Math.random() * 2)]}',
            '${faker.internet.email()}',
            '${faker.lorem.sentence()}',
            '${faker.address.latitude()}',
            '${faker.address.longitude()}',
             2, 'fake'
            ) RETURNING *; `;
        const {id} = (await pool.query(statement)).rows[0]
        ids = [...ids, id];
    }
    console.log('done')
    console.log('inserting fake profile pictures...')

   await Promise.all(ids.map(async id => {
        const image = await axios.get(faker.image.cats(300, 300), {responseType: 'arraybuffer'});
        const base64Image = `data:image/jpeg;base64,${Buffer.from(image.data, 'binary').toString('base64')}`
        let link = `${await imageModel.saveImageBlob(id, base64Image)}`;
        const imageId = await imageModel.addImageLink(id, link);
        await pool.query(`UPDATE users SET profile_picture_id = ${imageId} WHERE id = ${id}`)
    }))
    console.log('done')
    console.log('inserted', ids.length, 'entries')


}

initFakeUsers()
    .then(() => {console.log('initialization done!'); return 0})

//export default initFakeUsers();












