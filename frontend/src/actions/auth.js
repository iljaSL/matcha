import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAIL,
  PROFILE_CREATION_SUCCESS, GPS_SUCCESS,
} from './types';

import AuthService from '../services/auth.service';

const register = (username, firstname, lastname, email, password) => (dispatch) => AuthService.register(username, firstname, lastname, email, password).then(
  (response) => {
    dispatch({
      type: REGISTER_SUCCESS,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: response.data.message,
    });

    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
                    && error.response.data
                    && error.response.data.message)
                || error.message
                || error.toString();

    dispatch({
      type: REGISTER_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });

    return Promise.reject();
  },
);

const login = (username, password) => (dispatch) => AuthService.login(username, password).then(
  (data) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data },
    });
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
                && error.response.data
                && error.response.data.message)
                || error.message || error.toString();

    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  },
);

const forgotPassword = (username) => (dispatch) => AuthService.forgotPassword(username).then(
  (data) => {
    dispatch({
      type: FORGOT_PASSWORD,
      payload: { user: data },
    });
    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message || error.toString();
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    return Promise.reject();
  },
);

const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

const profileCreated = () => (dispatch) => {
  dispatch({type: PROFILE_CREATION_SUCCESS })
}


const getPosition = () => async (dispatch) => {
      navigator.geolocation.getCurrentPosition((coordinates) => {
          dispatch({type: GPS_SUCCESS, payload: {lat: coordinates.coords.latitude, long: coordinates.coords.longitude}})
      }, () => dispatch({type: 'GPS_ERROR'}));
}

export default {
  register,
  login,
  logout,
  forgotPassword,
  profileCreated,
  getPosition
};
