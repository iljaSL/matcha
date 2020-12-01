import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import registrationReducer from "./reducers/registrationReducer";
import userReducer from "./reducers/userReducer";
import auth from './reducers/auth';
import message from './reducers/message'

const reducer = combineReducers({
    registration: registrationReducer,
    user: userReducer,
    auth: auth,
    message: message
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

export default store