import React from 'react';
import {
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";

import './App.css';
import LoginForm from "./Components/LoginForm/LoginForm";
import SignUpForm from './Components/SignUp/SignUp'
import LandingPage from './Components/LandingPage/LandingPage'
import LandingPagePrompt from "./Components/LandingPage/LandingPagePrompt";


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
