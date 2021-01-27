import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import updateUserAction from '../../../actions/updateUserAction';

const useStyles = makeStyles((theme) => ({
    root: {
        alignContent: 'center'
    },
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

const Preference = () => {
  const classes = useStyles();
  const form = useRef();

  const [preference, setPreference] = useState('');
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangePreference = (e) => {
    const preference = e.target.value;
    setGender(preference);
  }

  const handlePreferenceChange = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    dispatch(updateUserAction.updatePreference(preference)).then(() => {
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
        Change Sexual Preference
        </Typography>
        <Form className={classes.form}>
            <FormGroup className={classes.root}>
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedA" />}
                    label="Female"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedB" />}
                    label="Male"
                />
                <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedF" />}
                    label="Other"
                />
            </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Preference;