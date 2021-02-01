import React, {useEffect, useState} from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

const Pictures = ({profile}) => {
  const classes = useStyles();
  const [profilePic, setProfilepic] = useState('')

  useEffect(() => {
    const getPic = async () => {
      setProfilepic((await axios.get(`http://localhost:3001/api/images/${profile.profile_picture_id}`)).data.imageBlob)
    }
    getPic();
  }, [])

  if (!profile)
  return null;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
          <GridListTile cols={2} rows={2}>
            <img src={`data:image/png;base64, ${profilePic}`} />
            <GridListTileBar
              titlePosition="top"
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
      </GridList>
    </div>
  );
}

export default Pictures;