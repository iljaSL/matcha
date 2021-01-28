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

const Password = () => {
  const classes = useStyles();

  const form = useRef();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangeOldPassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
  }

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    dispatch(updateUserAction.updatePassword(oldPassword, newPassword)).then(() => {
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
        Update your password
        </Typography>
        <Form onSubmit={handlePasswordChange} ref={form} className={classes.form} noValidate>
        {!successful && (
          <div>
              <TextField
                variant="outlined"
                color="secondary"
                required
                fullWidth
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
                autoComplete="current-password"
                value={oldPassword}
                onChange={onChangeOldPassword}
              />
              <TextField
                variant="outlined"
                color="secondary"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                value={newPassword}
                onChange={onChangeNewPassword}
              />
          </div> 
          )}
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

export default Password;