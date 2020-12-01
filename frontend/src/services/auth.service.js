import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users/'

const register = (username, firstname, lastname, email, password) => {
    return axios.post(baseUrl, {
        username,
        firstname,
        lastname,
        email,
        password
    })
}

export default {
    register,
}