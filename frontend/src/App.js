import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import './App.css';

import LoginForm from "./Components/LoginForm/LoginForm";
import SignUpForm from './Components/SignUp/SignUp'
import LandingPage from './Components/LandingPage/LandingPage'
import LandingPagePrompt from "./Components/LandingPage/LandingPagePrompt";
import CreateProfileForm from "./Components/ProfileCreation/CreateProfileForm";


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
