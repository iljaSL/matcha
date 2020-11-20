import axios from 'axios';

const initialState = {
    id: null,
    username: '',
    token: '',
    loginStatus: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
        const {id, username, token} = action.data
            return {id, username, token, loginStatus: true}
        case 'LOGOUT':
            return initialState;
        default: return state;
    }
}

export const login = (username, password) => {
    return async dispatch => {
        let response;
        try {
            response = await axios
                .post('http://localhost:3001/api/login/', {username, password})
        } catch (error) {throw error}
        dispatch({type: 'LOGIN', data: response.data})
    }
}

export default userReducer;