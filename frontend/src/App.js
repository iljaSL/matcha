import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import './App.css';

import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from './components/SignUp/SignUp'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import LandingPage from './components/LandingPage/LandingPage'
import LandingPagePrompt from "./components/LandingPage/LandingPagePrompt";
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";
import RegisterConfirmed from './components/RegisterConfirmed/RegisterConfirmed';


const App = () => {
    return (
            <Switch>
                <Route path="/signup">
                    <SignUpForm />
                </Route>
                <Route path="/login">
                   <LoginForm/>
                </Route>
                <Route path="/forgot-password">
                   <ForgotPassword/>
                </Route>
                <Route path="/confirmed">
                    <RegisterConfirmed />
                </Route>
                <Route path="/profilecreation">
                    <CreateProfileForm />
                </Route>
                <Route path="/">
                    <LandingPage />
                    <LandingPagePrompt />
                </Route>
            </Switch>
    );
}

export default App;
