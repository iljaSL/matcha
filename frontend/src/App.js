import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import './App.css';

import LoginForm from "./components/LoginForm/LoginForm";
import UserProfile from './components/MainPage/UserProfile/UserProfile';
import Navbar from './components/MainPage/Navbar/Navbar';
import Footer from './components/MainPage/Footer/Footer';
import SignUpForm from './components/SignUp/SignUp'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";
import Chat from "./components/Chat/Chat"
import ResetPassword from './components/ResetPassword/ResetPassword';
import MainPage from './components/MainPage/MainPage';
import ValidateProfile from './components/ProfileCreation/ValidateProfile'
import {useSelector, useDispatch} from "react-redux";
import {LOGIN_SUCCESS} from "./actions/types";

import authActions from './actions/auth'

import socketIOClient from 'socket.io-client'
import LandingPage from "./components/LandingPage/LandingPage";

const ENDPOINT = 'http://localhost:3001' // TODO: is this the right way to do it?
const socket = socketIOClient(ENDPOINT)


const App = () => {
    const Gallery = () => <p>gallery</p>
    const dispatch = useDispatch();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user")) || null;
        if (user && (Math.floor(Date.now() / 1000)) >= user.tokenExpiration)
            user = null;
        if (user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user}
            })
            dispatch(authActions.getPosition())
            socket.emit("setUserData", user);
        }
    }, [dispatch])

    useEffect(() => {
        if (user)
            socket.on('notification', (msg) => console.log(msg))
    }, [])


    const {isLoggedIn, user} = useSelector(state => state.auth);
    return (
        <>
        <Switch>
            <Route path="/mainpage">
                <MainPage/>
            </Route>
            <Route path="/user-profile">
                <UserProfile/>
            </Route>
            <Route path="/signup">
                <SignUpForm/>
            </Route>
            <Route path="/login">
                <LoginForm/>
            </Route>
            <Route path="/forgot-password">
                <ForgotPassword/>
            </Route>
            <Route path='/reset-password/:resetId'>
                <ResetPassword/>
            </Route>
            <Route path='/validateprofile/:validationId'>
                   <ValidateProfile/>
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
                    : <LandingPage />}
            </Route>
        </Switch>
        </>
    )
}

export default App;
