import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';

import CreateProfileForm from "./Components/ProfileCreation/CreateProfileForm";
import LoginForm from "./Components/LoginForm";
import {useSelector} from "react-redux";
import LandingPage from './Components/LandingPage/LandingPage'



const App = () => {
    const { user }  = useSelector(state => state)
    return (
        <Router>
            {/*<Link to="/">Home</Link> <br/>*/}
            {/*<Link to="/login">Login</Link> <br/>*/}
            {/*<Link to="/createProfile">Create profile</Link>*/}

            <Switch>
                <Route path="/createProfile">
                    <CreateProfileForm/>
                </Route>
                <Route path="/login">
                    {!user.loginStatus && <LoginForm/>}
                    {user.loginStatus && <div>logged in as {user.username} <button>unimplemented logout button</button></div>}
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
