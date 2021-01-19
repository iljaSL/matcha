import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MatchButton from './MatchButton/MatchButton';
import Pictures from './Pictures/Pictures';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  divider: {
    marginTop: '4rem',
  },
  cmp: {
    margin: '5rem',
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <>
    <Navbar />
    <Typography className={classes.divider} color="secondary" variant="h3">
           Lena Wolfgang Strauss (F)
    </Typography>
    <Typography className={classes.divider} color="secondary" variant="h4">
          HotOmeter: 95 🔥
    </Typography>
    <Typography className={classes.divider} color="secondary" variant="h5">
        Preferred gender: Male
    </Typography>
    <Grid container component="main" className={classes.root} className={classes.divider}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6}><Pictures /></Grid>
      <Grid item xs={12} sm={6} md={5} elevation={6}>
        <div >
          <Typography component="h1" variant="h5">
            BIO
          </Typography>
          <Typography component="h2" variant="h6">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet 
          clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea 
          takimata sanctus est Lorem ipsum dolor sit amet.
          </Typography>
        </div>
      </Grid>
    </Grid>
    <Container component="main" maxWidth="xs">
    <Typography className={classes.divider} color="secondary" variant="h6">
           (Username) is interested in: Vegan, Horses, Tags...
    </Typography>
    </Container>
    <Container component="main" maxWidth="xs">
    <MatchButton />
    </Container>
    {/* <Container component="main" maxWidth="xs">
    <Blocked />
    </Container> */}

    {/* 
    
    TODO: REPORT, BLOCK, SEE IF USER IS ONLINE IF NOT THE LAST TIME

     */}

    <Footer />
    </>
  );
}