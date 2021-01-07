import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const register = async (username, firstname, lastname, mail, password) => {
  const result = await axios.post(`${baseUrl}/users`, {
    username,
    firstname,
    lastname,
    mail,
    password,
  });
  return result.data;
}

const login = async (username, password) => axios.post(`${baseUrl}/login`, {
  username,
  password,
}).then((response) => {
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
});

const logout = () => {
  localStorage.removeItem('user');
};

const forgotPassword = async (username) => {
  const result = await axios.post(`${baseUrl}/users/forgot-password`, {
    username,
  });
  return result.data;
};

const updatePosition = async (coords) => {
  const {token} = JSON.parse(localStorage.getItem('user')) || {};
  axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`; // TODO: unify
  await axios.post(`${baseUrl}/users/location`, coords);
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  updatePosition,
};
