import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: '5rem',
    padding: '4rem',
  },
  icon: {
      fontSize: '6rem',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function SimpleTooltips({handleClick, matchButton}) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title={matchButton ? "Like" : "Unlike"} aria-label="add">
        <Fab onClick={handleClick} color="secondary" className={classes.fab}>
          {matchButton && <FavoriteIcon className={classes.icon}  />}
          {!matchButton && <NotInterestedIcon className={classes.icon} />}
        </Fab>
      </Tooltip>
    </div>
  );
}