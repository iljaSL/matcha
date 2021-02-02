import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import updateUserAction from '../../../actions/updateUserAction';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    outlined: {
        outline: "solid",
        outlineWidth: "1px",
        color: "#f50057",
    },
}));

const Email = () => {
    const classes = useStyles();
    const form = useRef();

    const [lat, setLat] = useState('0');
    const [long, setLong] = useState('0');
    const [successful, setSuccessful] = useState(false);

    const dispatch = useDispatch();

    const onChangeLat = (e) => setLat(e.target.value);

    const onChangeLong= (e) => setLong(e.target.value);

    const handlePositionChange = (e) => {
        e.preventDefault();
        setSuccessful(false);

        dispatch(updateUserAction.updatePosition({long, lat})).then(() => {
            setSuccessful(true);
        }).catch(() => {
            setSuccessful(false);
        })
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.outlined}>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h6">
                    Update your coordinates, the old-school way
                </Typography>
                <Form onSubmit={handlePositionChange} ref={form} className={classes.form} noValidate>
                    {!successful &&  <>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lat"
                                label="Latitude"
                                name="lat"
                                autoComplete="lat"
                                color="secondary"
                                value={lat}
                                onChange={onChangeLat}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="long"
                                label="Longitude"
                                name="long"
                                autoComplete="long"
                                color="secondary"
                                value={long}
                                onChange={onChangeLong}
                            />

                        </Grid>

                    </>
                    }
                    {!(long <= 180 && long >= -180 && lat >= -90 && lat <= 90) && <Typography> ⚠️ Incorrect coordinates! ⚠️</Typography>}
                    {(long <= 180 && long >= -180 && lat >= -90 && lat <= 90) && <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Update
                    </Button> }
                </Form>
            </div>
        </Container>
    );
}

export default Email;