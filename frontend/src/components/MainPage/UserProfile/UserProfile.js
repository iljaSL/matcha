import React, {useEffect, useState} from 'react';
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

import MenuButton from './MenuButton/MenuButton';
import MatchButton from './MatchButton/MatchButton';
import Pictures from './Pictures/Pictures';
import Footer from '../Footer/Footer';
import axios from "axios";
import {useParams} from "react-router-dom";
import {login} from "../../../reducers/userReducer";

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
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
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
  const [profile, setProfile] = useState()
  const [imageList, setImageList] = useState([])
  const { id } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      const profileData = (await axios.get(`http://localhost:3001/api/users/${id}`)).data
      setProfile(profileData)
    }
    getProfile();
  }, [])


   if (!profile)
    return null;

   const handleLike = async () => {
     await axios.post(`http://localhost:3001/api/matches/like/${id}`)
     const profileData = (await axios.get(`http://localhost:3001/api/users/${id}`)).data
     setProfile(profileData)
   }
   const handleUnlike = async () => {
     await axios.delete(`http://localhost:3001/api/matches/like/${id}`)
     setProfile({...profile, matched: false, liked: false})
   }
  return (
    <>
    <Typography className={classes.divider} color="secondary" variant="h3">
      {profile.firstname} "{profile.username}" {profile.lastname}
           <MenuButton />
    </Typography>
    <Typography className={classes.divider} color="secondary" variant="h4">
          Popularity: {profile.popularity_score} {profile.popularity_score > 20 && '🔥'}
    </Typography>
    <Typography className={classes.divider} color="secondary" variant="h5">
        Orientation: {profile.sexual_orientation}
    </Typography>
    <Grid container component="main" className={classes.root} className={classes.divider}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={6}>
        <Pictures imageList={profile.images} /> </Grid>
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
    <Typography className={classes.divider} color="secondary" variant="h6">
      {profile.username}'s interests: {profile.tags.map(tag => <Button key={tag.id}>{tag.tag}</Button>)}
    </Typography>
    </Container>
    <Container component="main" maxWidth="xs">
      {!profile.liked && <MatchButton matchButton handleClick={handleLike} id={profile.uid} />}
      {profile.liked && <MatchButton handleClick={handleUnlike} id={profile.uid} />}
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