import axios from 'axios';
import authHeader from './auth-header';

const baseUrl = 'http://localhost:3001/api';

const getUserBoard = () => {
    return axios.get
}

const getTags = async () => await axios.get(`${baseUrl}/api/tags`)

export default {
    getTags,
}