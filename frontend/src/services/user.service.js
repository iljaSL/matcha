import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const getTags = async () => await axios.get(`${baseUrl}/api/tags`)

export default {
    getTags,
}