import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    PROFILE_CREATION_SUCCESS,
    GPS_SUCCESS
} from '../actions/types';



const initialState = {isLoggedIn: false, user: []}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        case PROFILE_CREATION_SUCCESS:
            let { auth } = state
            auth.user.status = 2;
            return {
                ...state,
                auth
            }
        case GPS_SUCCESS:
            let { user } = state;
            user.coordinates = payload
            return {
                ...state, user
            }
        default:
            return state;
    }
}

export default authReducer;