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
import SignUpForm from './Components/SignUp'
import {useSelector} from "react-redux";
import LandingPage from './Components/LandingPage/LandingPage'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        background: "rgba(255, 250, 250, 0.6)",
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: "45px",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const App = () => {
    const classes = useStyles();
    const { user }  = useSelector(state => state)
    return (
        <Router>
            {/*<Link to="/">Home</Link> <br/>*/}




            <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
            >
                <Link to="/login">Login</Link> <br/>
            </Button>

            <Link to="/signup">Create profile</Link>

            <Switch>
                <Route path="/signup">
                    <SignUpForm />
                </Route>
                <Route path="/login">
                   <LoginForm/>
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
