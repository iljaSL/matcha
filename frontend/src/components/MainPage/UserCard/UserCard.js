import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    maxHeight: 410,
    height: 410,
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
}));

const UserCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Jeff Cox"
        subheader="HotOmeter: 101%"
      />
      <CardMedia
        className={classes.media}
        image="https://avatars1.githubusercontent.com/u/52207442?s=460&u=cf5611342017c2f1c66577a286f69aee74e29768&v=4"
        title="profile picture"
      />
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