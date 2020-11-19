import React from 'react'
import Particles from "react-particles-js";
import './LandingPage.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'white',
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    const particlesOptions = {
        "particles": {
            "number": {
                "value": 45,
                "density": {
                    "enable": true,
                    "value_area": 3000
                }
            },
            "line_linked": {
                "enable": true,
                "opacity": 0.30,
            },
            "move": {
                "speed": 0.3,

            },
            "shape": {
                "type": [
                    "image",
                ],
                "image": [
                    {
                        "src": "https://avatars2.githubusercontent.com/u/47740286?s=460&v=4",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://avatars1.githubusercontent.com/u/52207442?s=460&u=cf5611342017c2f1c66577a286f69aee74e29768&v=4",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://avatars3.githubusercontent.com/u/55028740?s=460&u=6592a84bd55b1b84228e338b4a11a319d1b372c5&v=4",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1483995564125-85915c11dcfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1479795746179-419986b1cbb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1455103433115-33cd90e2a3d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1509335035496-c47fc836517f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1532383911524-17cd3daf08cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1519084278803-b94f11e1c63b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1535324708031-0f7255090f89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1489388433353-df7543dd66e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1523111567642-f71bebeb173f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1536704258323-f2f4935acf41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400,
                    },
                ],
            },
            "opacity": {
                "value": 1.5,
                "anim": {
                    "enable": true,
                }
            },
            "size": {
                "value": 100,
                "random": false,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "size_min": 100,
                }
            },
        },
        "retina_detect": false
    }


    return (
        <div>
            <h1>Find you love...On matcha!</h1>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>

                </Box>
            </Container>
            <Particles className="particles" params={particlesOptions} />

        </div>

    )
}

export default LandingPage