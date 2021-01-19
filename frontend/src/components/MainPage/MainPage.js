import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserCard from './UserCard/UserCard';
import Navbar from './Navbar/Navbar';
import Filter from './Filter/Filter';
import Footer from './Footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '200px',
  },
  control: {
    padding: theme.spacing(5),
  },
}));

const MainPage = () => {
  const [spacing, setSpacing] = React.useState(8);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <>
    <Navbar />
    <Filter />
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs>
        <Grid container justify="center" spacing={spacing}>
          {[0, 1, 2, 3, 4, 5, 6 ,7 ,8 ,9, 10, 11, 12].map((value) => (
            <Grid key={value} item>
              <UserCard className={classes.paper} />
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