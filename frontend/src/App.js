import React from 'react';
import {
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";

import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from './components/SignUp/SignUp'
import LandingPage from './components/LandingPage/LandingPage'
import LandingPagePrompt from "./components/LandingPage/LandingPagePrompt";


const App = () => {
    let location = useLocation();
    // const { user }  = useSelector(state => state)
    return (
        <div>
            <Switch>
                <Route path="/signup">
                    <SignUpForm />
                </Route>
                <Route path="/login">
                   <LoginForm/>
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
