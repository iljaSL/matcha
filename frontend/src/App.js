import React from 'react';
import {
    Switch,
    Route,
    useLocation,
    Link
} from "react-router-dom";

import './App.css';

// import CreateProfileForm from "./Components/ProfileCreation/CreateProfileForm";
import LoginForm from "./Components/LoginForm";
import SignUpForm from './Components/SignUp'
import {useSelector} from "react-redux";
import LandingPage from './Components/LandingPage/LandingPage'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    button: {
        marginBottom: '20px',
        width: '30%',
    }
}));

const App = () => {
    const classes = useStyles();
    let location = useLocation();
    // const { user }  = useSelector(state => state)
    return (
        <div>
            { location.pathname === '/login' || location.pathname === '/signup' ?
                null
            :   <Link to="/login" style={{ textDecoration: 'none' }}>
                    <div className='slider'>
                        Find
                        <div className='flip'>
                            <div><div>LOVE</div></div>
                            <div><div>JOCKE</div></div>
                            <div><div>DATA SCIENTISTS</div></div>
                        </div>
                        on Matcha!
                    </div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >
                        Login
                    </Button><br/>
                </Link>}

            {location.pathname === '/signup' || location.pathname === '/login' ?
                    null
                :
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.button}
                >
                Sign Up <br/>
                </Button>
                </Link>
            }
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
        </div>
    );
}

export default App;
