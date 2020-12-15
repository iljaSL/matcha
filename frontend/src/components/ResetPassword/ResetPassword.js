import React, {useRef, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';
import ReportProblemSharpIcon from '@material-ui/icons/ReportProblemSharp';
import { makeStyles } from '@material-ui/core/styles';
import Form from "react-validation/build/form";
import authService from '../../actions/auth';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = (props) => {
    const classes = useStyles();
    const form = useRef();

    const [username, setUsername] = useState('');
    const { message } = useSelector(state => state.message);
    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const handlePasswordForgot = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        dispatch(authService.forgotPassword(username)).then(() => {
            setSuccessful(true);
            props.history.push("/");
        }).catch(() => {
            setSuccessful(false);
        })
    };

    if (successful) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ReportProblemSharpIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Form onSubmit={handlePasswordForgot} ref={form} className={classes.form} >
                    {!successful && (
                        <TextField
                            variant="outlined"
                            color="secondary"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={onChangeUsername}
                        />
                    )}
                    <Typography variant="subtitle2">
                        Please fill in your username and you will get a reset-link sent to your registered email!
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Reset your password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2" color="secondary">
                                Back to Sign in
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" color="secondary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    {message && (
                        <Alert severity="error" role="alert">
                            {message}
                        </Alert>
                    )}
                </Form>
            </div>
        </Container>
    );
}

export default ResetPassword;