import {
    UPDATE_NAME_SUCCESS,
    UPDATE_NAME_FAIL,
    SET_MESSAGE,
} from './types';

import UpdateService from '../services/update.service';

const updateFirstLastName = (firstName, lastName) => (dispatch) => UpdateService.updateFirstLastName(firstName, lastName).then(
    (data) => {
        dispatch({
            type:  UPDATE_NAME_SUCCESS,
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
            type: UPDATE_NAME_FAIL,
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
}