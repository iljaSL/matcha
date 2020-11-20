import React from 'react'
import Particles from "react-particles-js";
import './LandingPage.css'
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
            "polygon": {
                "enable": true,
                "move": {
                    "radius": 10
                },
            },
            "shape": {
                "type": [
                    "image",
                ],
                "image": [
                    {
                        "src": "https://avatars2.githubusercontent.com/u/47740286?s=460&v=4",
                        "height": 400,
                        "width": 400
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
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1535324708031-0f7255090f89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1489388433353-df7543dd66e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1523111567642-f71bebeb173f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": "https://images.unsplash.com/photo-1536704258323-f2f4935acf41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
                        "height": 400,
                        "width": 400
                    },
                    {
                        "src": " https://avatars1.githubusercontent.com/u/51363730?s=460&u=d7996d1fd86eae9bf6e43f2dd75b9a46bb9ae731&v=4",
                        "height": 400,
                        "width": 400
                    },
                ],
            },
            "opacity": {
                "value": 2.0,
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
            <Container component="main" maxWidth="xs" className={classes.paper}>
                <CssBaseline />
                <div>
                    <h1>Are you lonely? Are you desperate? Say no more! <br/>
                        Matcha is the right place for you!</h1>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Create an account
                        </Button>
                    <h1>or</h1>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                </div>
            </Container>
            <Particles className="particles" params={particlesOptions} />

        </div>

    )
}

export default LandingPage