import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Bio from './Bio';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import FirstLastName from './FirstLastName';
import Email from './Email';
import Password from './Password';
import Gender from './Gender';
import Preference from './Preference';
import Tags from './Tags';
import Delete from './Delete';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  divider: {
      marginBottom: '2rem',
      width: '100%'
  },
}));

export default function MyAccount() {
  const classes = useStyles();
  const { message } = useSelector(state => state.message);

  return (
    <>
    <Navbar />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.divider}>
         My Account Settings
        </Typography>
        {message && (
            <Alert severity="error" role="alert">
            {message}
            </Alert>
          )}
        <div className={classes.divider}>
        <FirstLastName />
        </div>
        <div className={classes.divider}>
        <Bio />
        </div>
        <div className={classes.divider}>
        <Gender />
        </div>
        <div className={classes.divider}>
        <Preference />
        </div>
        <div className={classes.divider}>
        <Tags />
        </div>
        <div className={classes.divider}>
        <Email />
        </div>
        <div className={classes.divider}>
        <Password />
        </div>
        <div className={classes.divider}>
        <Delete />
        </div>
      </div>
    </Container>
    <Footer />
    </>
  );
}