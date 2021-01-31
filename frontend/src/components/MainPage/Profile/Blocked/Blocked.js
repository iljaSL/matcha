import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import updateUserAction from '../../../../actions/updateUserAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Blocked = () => {
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState()
  const id = currentUser.id;

  const handleUnblock = async (blockedUserId) => {
    await axios.post(`http://localhost:3001/api/users/unblock/${id}/${blockedUserId}`)
    const profileData = (await axios.get(`http://localhost:3001/api/users/blockedUsers/${id}`)).data
    setProfile(profileData)
  }

  useEffect(() => {
    const getProfile = async () => {
      const profileData = (await axios.get(`http://localhost:3001/api/users/blockedUsers/${id}`)).data
      setProfile(profileData)
    }
    getProfile();
  }, [])

  if (!profile)
    return null;

  return (
    <div className={classes.root}>
    {console.log(profile)}
        <Grid item xs={12} md={12}>
          <Typography color="secondary" variant="h6" className={classes.title}>
           Blocked Users
          </Typography>
          <div className={classes.demo}>
            <List>
              {profile.map((user) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BlockIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                  />
                  <ListItemSecondaryAction>      
                    <IconButton 
                    edge="end" 
                    aria-label="unblock"
                    onClick={() => handleUnblock(user.id)}
                    >
                      <DeleteIcon      
                      color='secondary' />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
    </div>
  );
}

export default Blocked;