import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users/'

const register = (username, firstname, lastname, mail, password) => {
    return axios.post(baseUrl, {
        username,
        firstname,
        lastname,
        mail,
        password
    })
}

const logout = () => {
    localStorage.removeItem("user");
  };

export default {
    register,
    logout,
};