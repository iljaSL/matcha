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

const resetPassword = async (password, confirmPassword) => {
  let key = document.location.href;
  key = key.split('/');

  const result = await axios.post(`${baseUrl}/users/reset-password/${key[key.length - 1]}`, {
    new_password: password,
    repeat_password: confirmPassword
  });
  return result.data;
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword
  updatePosition,
};
