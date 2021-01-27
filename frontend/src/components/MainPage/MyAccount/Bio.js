import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import TextField from '@material-ui/core/TextareaAutosize';
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

const Bio = () => {
  const classes = useStyles();
  const form = useRef();

  const [bio, setBio] = useState('')
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangeBio = (e) => {
    const bio = e.target.value;
    setBio(bio);
  }

  const handleBioChange = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    dispatch(updateUserAction.updateBio(bio)).then(() => {
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
        Update your Bio
        </Typography>
        <Form onSubmit={handleBioChange} ref={form} className={classes.form} noValidate>
        {!successful && (
        <TextField aria-label="minimum height" rowsMin={10} 
          placeholder="You can resize me" 
          required
          id="bio"
          name="bio"
          autoComplete="lname"
          value={bio}
          onChange={onChangeBio}
        />
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

export default Bio;