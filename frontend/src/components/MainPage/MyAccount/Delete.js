import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import DeleteIcon from '@material-ui/icons/Delete';
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
    width: '60%'
  },
  outlined: {
    outline: "solid",
    outlineWidth: "1px",
    color: "#f50057",
},
}));

export default function Delete() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(updateUserAction.deleteUser());
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.outlined}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
        ⚠️ Delete your User Account ⚠️
        </Typography>
        <Form onSubmit={handleDelete} className={classes.form} noValidate>
        <Button
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.submit}
        startIcon={<DeleteIcon />}
        >
        Delete
        </Button>
        </Form>
      </div>
    </Container>
  );
}