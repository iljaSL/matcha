import React, {useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import updateUserAction from '../../../actions/updateUserAction';
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  }
}));

const FirstLastName = (props) => {
  const classes = useStyles();
  const form = useRef();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const { message } = useSelector(state => state.message);
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  }

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  }

  const handleNameChange = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    dispatch(updateUserAction.updateFirstLastName(firstName, lastName)).then(() => {
      setSuccessful(true);
    }).catch(() => {
      setSuccessful(false);
    })
  }

  return (
    <Container className={classes.outlined} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
        Update your First and Last Name
        </Typography>
        <Form onSubmit={handleNameChange} ref={form} className={classes.form} noValidate>
        {!successful && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                color="secondary"
                value={firstName}
                onChange={onChangeFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                color="secondary"
                value={lastName}
                onChange={onChangeLastName}
              />
            </Grid>
          </Grid>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="secondary"
          >
            Update
          </Button>
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

export default FirstLastName;