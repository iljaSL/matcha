import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    margin: '5rem',
  },
  inline: {
    display: 'inline',
  },
  color: {
    color:  '#f50057',
    textDecoration: 'none',
  },
  fontColor: {
    color: 'black'
  }
}));

export default function History() {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState()
  const id = currentUser.id;

  useEffect(() => {
    let mounted = true
    if(mounted){
      const getProfile = async () => {
        const profileData = (await axios.get(`http://localhost:3001/api/users/userVisit/${id}`)).data
        setProfile(profileData)
      }
      getProfile();
    }
    return () => {
      mounted = false 
     }
  }, [])

  if (!profile)
    return null;

  return (
    <>
    <List className={classes.root}>
    <Typography color="secondary" variant="h6" className={classes.title}>
           Your Visitor History
    </Typography>
    {profile.map((user) => (
      <div key={user.id}>
      <Link to={`/user-profile/${user.id}`} className={classes.color} >
      <ListItem  alignItems="flex-start" >
        <ListItemAvatar>
          <PersonIcon />
        </ListItemAvatar>
        <ListItemText 
        className={classes.fontColor}
          primary={user.username}
        />
      </ListItem>
      </Link>
      <Divider variant="inset" component="li" />
      </div>
      ))}
    </List>
    </>
  );
}