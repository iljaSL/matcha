import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

import History from './History/History';
import Pictures from './Pictures/Pictures';
import Footer from '../Footer/Footer';
import Blocked from './Blocked/Blocked'
import Matches from './Matches/Matches';

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
    marginTop: '2rem',
  },
  cmp: {
    margin: '5rem',
  }
}));

const Profile = () => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState()
  const id = currentUser.id;

  useEffect(() => {
    const getProfile = async () => {
      const profileData = (await axios.get(`http://localhost:3001/api/users/${id}`)).data
      setProfile(profileData)
    }
    getProfile();
  }, [])

  if (!profile)
    return null;

  return (
    <>
    <Typography className={classes.divider} color="secondary" variant="h3">
    {profile.firstname} {profile.lastname}
    </Typography>
    <Typography className={classes.divider} color="secondary" variant="h4">
      Popularity: {profile.popularity_score} {profile.popularity_score < 20 && '❄️'} {profile.popularity_score > 20 && '🔥'}
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
          {profile.bio}
          </Typography>
        </div>
      </Grid>
    </Grid>
    <Container component="main" maxWidth="xs">
    <Matches />
    </Container>
    <Container component="main" maxWidth="xs">
    <History />
    </Container>
    <Container component="main" maxWidth="xs">
    <Blocked />
    </Container>

    <Footer />
    </>
  );
}

export default Profile;