import React, { useEffect, useState }  from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import axios from 'axios';
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginTop: '3rem',
  }
}));


const NotificationEntry = ({notification}) => {
    const string = `You have a new ${notification.event} from ${notification.username}!`
    switch (notification.event) {
        case 'message':
            return  <ListItem button component={Link} to="/messenger" >
                <ListItemIcon>
                    <MessageIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={string} />
            </ListItem>

        case 'like': // TODO: link to user profile
            return  <ListItem button component={Link} to="/" >
                <ListItemIcon>
                    <ThumbUpIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={string} />
            </ListItem>

        case 'match': // TODO: link to user profile
            return  <ListItem button component={Link} to="/" >
                <ListItemIcon>
                    <FavoriteIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={string} />
            </ListItem>

    }
}



export default function Notification() {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([])
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        const getNotifications = async () => {
            setNotifications((await axios.get(`http://localhost:3001/api/users/${user.id}/notifications`)).data)
        }
        if (user.id) {
            getNotifications()
            return;
        }
    }, [user])
  return (
    <>
    <Navbar/>
    <Container component="main" maxWidth="xs" className={classes.divider}>
    <div className={classes.root}>
    <Typography component="h1" variant="h5">
       Your Notifications
    </Typography>
        {notifications.map(notification => <NotificationEntry key={notification.id} notification={notification}/>) }
    </div>
    </Container>
    <Footer/>
    </>
  );
}