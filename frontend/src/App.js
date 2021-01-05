import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import './App.css';

import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from './components/SignUp/SignUp'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import LandingPage from './components/LandingPage/LandingPage'
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";
import Chat from "./components/Chat/Chat"
import {useSelector, useDispatch} from "react-redux";
import {GPS_SUCCESS, LOGIN_SUCCESS} from "./actions/types";
import RegisterConfirmed from './components/RegisterConfirmed/RegisterConfirmed';

import authActions from './actions/auth'

import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:3001' // TODO: is this the right way to do it?
const socket = socketIOClient(ENDPOINT)


const App = () => {
    const Gallery = () => <p>gallery</p>
    const dispatch = useDispatch();



    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user}
            })
        }
        dispatch(authActions.getPosition())
    }, [dispatch])


    const {isLoggedIn, user} = useSelector(state => state.auth);
    return (
        <Switch>
            <Route path="/signup">
                <SignUpForm/>
            </Route>
            <Route path="/login">
                <LoginForm/>
            </Route>
            <Route path="/forgot-password">
                <ForgotPassword/>
            </Route>
            <Route path="/confirmed">
                <RegisterConfirmed/>
            </Route>
            <Route path="/profilecreation">
                <CreateProfileForm/>
            </Route>
            <Route path="/gallery">
                <Gallery/>
            </Route>
            <Route path="/chat">
                <Chat socket={socket}/>
            </Route>
            <Route path="/">
                {isLoggedIn
                    ? user.status === 2
                        ?  <Redirect to="/" /> : <Redirect to="/profilecreation"/>
                    : <LandingPage/>}
            </Route>
        </Switch>
    )
}

export default App;
