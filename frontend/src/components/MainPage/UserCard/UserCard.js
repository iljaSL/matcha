import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

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
  link: {
    textDecoration: 'none',
  },
  heartPosition: {
    marginLeft: '160px',
  },
}));

const UserCard = ({user}) => {
  const classes = useStyles();
  const [profilePic, setProfilepic] = useState('')
  const [matchStatus, setMatchStatus] = useState({liked: false, matched: false})

  useEffect(() => {
    const source = axios.CancelToken.source()
    
    const getPic = async () => {
      try {
        setProfilepic((await axios.get(`http://localhost:3001/api/images/${user.profile_picture_id}`, {
          cancelToken: source.token,
        })).data.imageBlob)
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
            throw error
        }
      }
    }
    getPic();
    return () => {
      source.cancel()
    }
  }, [])

  useEffect(() => {
    const source = axios.CancelToken.source()

    const getMatchStatus = async () => {
      try {
         setMatchStatus((await axios.get(`http://localhost:3001/api/matches/like/${user.uid}`, {
          cancelToken: source.token,
         })).data)
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
            throw error
        }
      }
    }
    getMatchStatus();
    return () => {
      source.cancel()
    }
  }, [])

  const handleLike = async () => {
    await axios.post(`http://localhost:3001/api/matches/like/${user.uid}`)
    setMatchStatus((await axios.get(`http://localhost:3001/api/matches/like/${user.uid}`)).data)
  }
  const handleUnlike = async () => {
    await axios.delete(`http://localhost:3001/api/matches/like/${user.uid}`)
    setMatchStatus((await axios.get(`http://localhost:3001/api/matches/like/${user.uid}`)).data)
  }


  return (
    <Card className={classes.root}>
      <Link to={`/user-profile/${user.uid}`} className={classes.link}>
      <CardHeader
        className={classes.iconcolor}
        title={`${user.firstname} ${user.lastname}`}
        subheader={`Popularity: ${user.popularity_score} Distance: ${Math.round(user.distance_in_miles * 0.621371)} km`}
      />
      <CardMedia
        className={classes.media}
        image={`data:image/png;base64, ${profilePic}`}
        title="profile picture"
      />
      </Link>
      <CardActions disableSpacing>
        <IconButton className={classes.heartPosition} aria-label="match" onClick={matchStatus.liked ? handleUnlike : handleLike}>
          <Tooltip title={matchStatus.liked ? "unlike" : "like"} aria-label="add">
            <FavoriteIcon color={matchStatus.liked ? "secondary" : "inherit"}/>
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default UserCard;