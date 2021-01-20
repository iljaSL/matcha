import React, { useEffect } from 'react';
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
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import LandingPage from './components/LandingPage/LandingPage'
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";
import ResetPassword from './components/ResetPassword/ResetPassword';
import MainPage from './components/MainPage/MainPage';
import {useSelector, useDispatch} from "react-redux";
import {LOGIN_SUCCESS} from "./actions/types";


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
    }, [dispatch])

    const {isLoggedIn, user} = useSelector(state => state.auth);
    return (
        <>
        <Switch>
            <Route path="/mainpage">
                <MainPage/>
            </Route>
            <Route path="/messenger">
                <Messenger />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/user-profile">
                <UserProfile />
            </Route>
            <Route path="/my-account">
                <MyAccount />
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
            <Route path="/profilecreation">
                <CreateProfileForm/>
            </Route>
            <Route path="/gallery">
                <Gallery/>
            </Route>
            <Route path="/">
                {isLoggedIn
                    ? user.status === 2
                        ? <Gallery/> : <Redirect to="/profilecreation"/>
                    : <LandingPage/>}
            </Route>
        </Switch>
        </>
    )
}

export default App;
