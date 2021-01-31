import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserCard from './UserCard/UserCard';
import Filter from './Filter/Filter';
import Footer from './Footer/Footer';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '200px',
  },
  control: {
    padding: theme.spacing(5),
  },
}));

const MainPage = () => {
  const [spacing, setSpacing] = useState(8);
  const [distance, setDistance] = useState(500);
  const [users, setUsers] = useState([]);

  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleDistance = (event, value) => {
    console.log(value)
    setDistance(value)
  }

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:3001/api/matches/${distance}`)
      setUsers(response.data)
    }
    getUsers();
  }, [distance])

  return (
    <>
    <Filter distance={distance} handleDistance={handleDistance} />
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs>
        <Grid container justify="center" spacing={spacing}>
          {users.map(user => (
            <Grid key={user.uid} item>
              <UserCard className={classes.paper} user={user}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    <Footer />
    </>
  );
}

export default MainPage;