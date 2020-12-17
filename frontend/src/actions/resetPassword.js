import {
    RESET_PASSWORD,
    RESET_PASSWORD_FAIL,
    SET_MESSAGE
} from './types';

import AuthService from '../services/auth.service';

const resetPassword = (password, confirmPassword) => (dispatch) => AuthService.resetPassword(password, confirmPassword).then(
    (data) => {
        dispatch({
            type: RESET_PASSWORD,
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
            type: RESET_PASSWORD_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });
        return Promise.reject();
    },
);

export default {
    resetPassword,
}