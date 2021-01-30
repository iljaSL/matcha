import React, {useEffect, useState} from 'react';
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import './App.css';

import Messenger from './components/MainPage/Messenger/Messenger';
import MyAccount from "./components/MainPage/MyAccount/MyAccount";
import LoginForm from "./components/LoginForm/LoginForm";
import Profile from './components/MainPage/Profile/Profile';
import UserProfile from './components/MainPage/UserProfile/UserProfile';
import Navbar from './components/MainPage/Navbar/Navbar';
import Footer from './components/MainPage/Footer/Footer';
import SignUpForm from './components/SignUp/SignUp'
import Notification from './components/MainPage/Notification/Notification';
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";
import ResetPassword from './components/ResetPassword/ResetPassword';
import MainPage from './components/MainPage/MainPage';
import ValidateProfile from './components/ProfileCreation/ValidateProfile'
import {useSelector, useDispatch} from "react-redux";
import {LOGIN_SUCCESS} from "./actions/types";


import authActions from './actions/auth'

import socketIOClient from 'socket.io-client'
import LandingPage from "./components/LandingPage/LandingPage";
import axios from 'axios';

const ENDPOINT = 'http://localhost:3001' // TODO: is this the right way to do it?
const socket = socketIOClient(ENDPOINT)


const App = () => {
    const dispatch = useDispatch();
    const [newNotifications, setNewNotifications] = useState({});
    const [newMessages, setNewMessages] = useState({});

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user")) || null;
        if (user && (Math.floor(Date.now() / 1000)) >= user.tokenExpiration) {
            user = null;
            localStorage.removeItem("user")
        }
        if (user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {user}
            })
            dispatch(authActions.getPosition())
            socket.emit("setUserData", user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${ user.token }`;
        }
    }, [dispatch])


    socket.once('notification', notification => {
        if (!newNotifications.includes(notification) && notification.event !== 'message')
            setNewNotifications([...newNotifications, notification])
        else if (notification.event === 'message' && !newMessages.includes(notification))
            setNewMessages([...newMessages, notification])
    })

    const NavRoute = ({exact, path, component: Component}) => (
        <Route exact={exact} path={path} render={(props) => (
            <div>
                <Navbar newNotifications={newNotifications} newMessages={newMessages} />
                <Component {...props}/>
            </div>
        )}/>
    )


    const {isLoggedIn, user} = useSelector(state => state.auth);

    if (!isLoggedIn)
    return  <Switch>
              <Route exactly component={SignUpForm} path="/signup" />
              <Route exactly component={LoginForm} path="/login" />
              <Route exactly path='/reset-password/:resetId' component={ResetPassword} />
              <Route exactly path='/validateprofile/:validationId' component={ValidateProfile} />
              <Route exactly component={ForgotPassword} path="/forgot-password" />
              <Route path="/" component={LandingPage} />
            </Switch>
    return (
        <>
        <Switch>
            <NavRoute exactly component={MainPage} path="/mainpage" />
            <NavRoute exactly component={Notification} path="/notification" />
            <NavRoute exactly component={() => <Messenger socket={socket} /> }  path="/messenger" />
            <NavRoute exactly component={Profile} path="/profile" />
            <NavRoute exactly component={UserProfile} path="/user-profile/:id" />
            <NavRoute exactly component={MyAccount} path="/my-account" />
            <Route exactly path='/profilecreation' component={CreateProfileForm} />
            <Route exactly path='/validateprofile/:validationId' component={ValidateProfile} />
            <Route path="/">
                {user.status === 2 ? <Redirect to="/mainpage" /> : <Redirect to="/profilecreation"/> }
            </Route>
        </Switch>
        </>
    )
}

export default App;
