import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import registrationReducer from "./reducers/registrationReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    registration: registrationReducer,
    user: userReducer
})

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

export default store