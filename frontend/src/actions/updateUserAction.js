import {
    UPDATE_NAME_SUCCESS,
    UPDATE_NAME_FAIL,
    UPDATE_BIO_SUCCESS,
    UPDATE_BIO_FAIL,
    UPDATE_GENDER_SUCCESS,
    UPDATE_GENDER_FAIL,
    UPDATE_PREFERENCE_SUCCESS,
    UPDATE_PREFERENCE_FAIL,
    UPDATE_MAIL_SUCCESS,
    UPDATE_MAIL_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_DELETE_SUCCESS,
    UPDATE_TAGS_SUCCESS,
    UPDATE_TAGS_FAIL,
    SET_MESSAGE,
} from './types';

import UpdateService from '../services/update.service';

const updateFirstLastName = (firstName, lastName) => (dispatch) => UpdateService.updateFirstLastName(firstName, lastName).then(
    (response) => {
        dispatch({
            type:  UPDATE_NAME_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        console.log('err', error.message);
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_NAME_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updateBio = (bio) => (dispatch) => UpdateService.updateBio(bio).then(
    (data) => {
        dispatch({
            type:  UPDATE_BIO_SUCCESS,
            payload: data.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        dispatch({
            type: UPDATE_BIO_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updateGender = (gender) => (dispatch) => UpdateService.updateGender(gender).then(
    (response) => {
        dispatch({
            type:  UPDATE_GENDER_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_GENDER_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updatePreference = (preference) => (dispatch) => UpdateService.updatePreference(preference).then(
    (response) => {
        dispatch({
            type: UPDATE_PREFERENCE_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_PREFERENCE_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updateMail = (mail) => (dispatch) => UpdateService.updateMail(mail).then(
    (response) => {
        dispatch({
            type: UPDATE_MAIL_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_MAIL_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updatePassword = (oldPassword, newPassword) => (dispatch) => UpdateService.updatePassword(oldPassword, newPassword).then(
    (response) => {
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const updateTags = (tags) => (dispatch) => UpdateService.updateTags(tags).then(
    (response) => {
        dispatch({
            type: UPDATE_TAGS_SUCCESS,
            payload: response.message,
        });
        return Promise.resolve();
    },
    (error) => {
        const message = (error.response
            && error.response.data
            && error.response.data.message)
            || error.message || error.toString();
        
        dispatch({
            type: UPDATE_TAGS_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

const deleteUser = () => (dispatch) => {
    UpdateService.deleteUser();
  
    dispatch({
      type: UPDATE_DELETE_SUCCESS,
    });
  };


export default {
    updateTags,
    updateFirstLastName,
    updateBio,
    updateGender,
    updatePreference,
    updateMail,
    updatePassword,
    deleteUser,
}