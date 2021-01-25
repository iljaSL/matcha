import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function Notification() {
  const classes = useStyles();

  return (
    <>
    <Navbar/>
    <Container component="main" maxWidth="xs" className={classes.divider}>
    <div className={classes.root}>
    <Typography component="h1" variant="h5">
       Your Notification's
    </Typography>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a match!" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a new message!" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a match!" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a new message!" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a match!" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon color='secondary' />
          </ListItemIcon>
          <ListItemText primary="You have a new message!" />
        </ListItem>
    </div>
    </Container>
    <Footer/>
    </>
  );
}