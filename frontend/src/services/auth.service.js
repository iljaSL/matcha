import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const register = (username, firstname, lastname, mail, password) => axios.post(`${baseUrl}/users`, {
  username,
  firstname,
  lastname,
  mail,
  password,
});

const login = (username, password) => axios.post(`${baseUrl}/login`, {
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

export default {
  register,
  login,
  logout,
  forgotPassword,
};
