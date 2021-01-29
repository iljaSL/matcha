import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from "axios";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '-150px',
    maxWidth: 400,
    maxHeight: 420,
    height: 420,
    width: 400,
  },
  media: {
    height: 50,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  iconcolor: {
    color: "#f50057",
  },
}));

const UserCard = ({user}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [profilePic, setProfilepic] = useState('')
  useEffect(() => {
    const getPic = async () => {
      setProfilepic((await axios.get(`http://localhost:3001/api/images/${user.profile_picture_id}`)).data.imageBlob)
    }
    getPic();
  }, [])

  return (
    <Card className={classes.root}>
      <Link to={`/user-profile/${user.uid}`}>
      <CardHeader
        className={classes.iconcolor}
        title={`${user.firstname} ${user.lastname}`}
        subheader={`Popularity score: ${user.popularity_score}`}
      />
      <CardMedia
        className={classes.media}
        image={`data:image/png;base64, ${profilePic}`}
        title="profile picture"
      />
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="match">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="thumb-down">
          <ThumbDownIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default UserCard;