import {
    UPDATE_NAME_SUCCESS,
    UPDATE_NAME_FAIL,
    UPDATE_BIO_SUCCESS,
    UPDATE_BIO_FAIL,
    UPDATE_GENDER_SUCCESS,
    UPDATE_GENDER_FAIL,
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
        console.log('err', error.message);
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

export default {
    updateFirstLastName,
    updateBio,
    updateGender,
}