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
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '200px',
  },
  control: {
    padding: theme.spacing(5),
  },
}));

const getPreferences = (orientation) => {
  switch (orientation) {
    case 'pansexual':
      return ['man', 'woman', 'other']
    case 'gynesexual':
      return ['woman', 'other']
    case 'androsexual':
       return ['man', 'other']
  }
}


const MainPage = () => {
  const {user} = useSelector(state => state.auth);
  const initialGenders = getPreferences(user.orientation)
  const [spacing, setSpacing] = useState(8);
  const [distance, setDistance] = useState(500);
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [sort, setSort] = useState('default');
  const [filteredGenders, setGenderFilter] = useState(initialGenders);

  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleDistance = (event, value) => {
    setDistance(value)
  }

  const handleSort = (event, sort = null) => {
    let sorted;
    if (event) sort = null
    switch (sort || event.target.value ) {
      case 'score':
        setSort('score');
        sorted = users;
        sorted.sort((a, b) => {
          return (a.popularity_score < b.popularity_score) ? 1 : -1
        })
        setDisplayedUsers(sorted)
        break;
      case 'distance':
        setSort('distance');
        sorted = users;
        sorted.sort((a, b) => {
          return (a.distance < b.distance) ? 1 : -1
        })
        setDisplayedUsers(sorted)
        break;
      case 'tags':
        setSort('tags');
        sorted = users;
        sorted.sort((a, b) => {
          return (a.tags_in_common < b.tags_in_common) ? 1 : -1
        })
        setDisplayedUsers(sorted)
        break;
      case 'default':
        setSort('default')
        sorted = users;
        setDisplayedUsers(sorted)
        break;
    }
  }

  const handleFilter = (gender) => {
     if (filteredGenders.includes(gender))
         setGenderFilter(filteredGenders.filter(g => g !== gender))
      else
       setGenderFilter([...filteredGenders, gender])
    handleSort(null, sort);
    }

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(`http://localhost:3001/api/matches/${distance}`)
      setUsers(response.data)
    }
    getUsers();
  }, [distance, displayedUsers[0]])

  useEffect(() => {
    if (users) setDisplayedUsers(users)
  }, [users.length])

  useEffect(() => {
    const sorted = displayedUsers.filter(user => filteredGenders.includes(user.gender))
    setDisplayedUsers(sorted);
  }, [filteredGenders.length])


  return (
    <>
    <Filter distance={distance}
            handleDistance={handleDistance}
            users={users}
            handleSort={handleSort}
            sort={sort}
            handleFilter={handleFilter}
            genderList={initialGenders}
            selectedGenders={filteredGenders}
    />
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs>
        <Grid container justify="center" spacing={spacing}>
          {displayedUsers.map(user => (
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