import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import './App.css';

import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from './components/SignUp/SignUp'
import LandingPage from './components/LandingPage/LandingPage'
import LandingPagePrompt from "./components/LandingPage/LandingPagePrompt";
import CreateProfileForm from "./components/ProfileCreation/CreateProfileForm";


const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/signup">
                    <SignUpForm />
                </Route>
                <Route path="/login">
                   <LoginForm/>
                </Route>
                <Route path="/profilecreation">
                    <CreateProfileForm />
                </Route>
                <Route path="/">
                    <LandingPage />
                    <LandingPagePrompt />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
