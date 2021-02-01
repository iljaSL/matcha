import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import axios from "axios";

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

const Picture = ({pictureId}) => {
    const classes = useStyles();
    const [image, setImage] = useState([]);
    useEffect(() => {
        const getImage = async (id) => {
            const res = await axios.get(`http://localhost:3001/api/images/${id}`)
            setImage(res.data.imageBlob)
            return res
        }
        getImage(pictureId)
    })

    return <GridListTile cols={2} rows={2}>
        <img src={`data:image/png;base64, ${image}`}/>
        <GridListTileBar
            titlePosition="top"
            actionPosition="left"
            className={classes.titleBar}
        />
    </GridListTile>
}

export default function Pictures({imageList}) {

    if (!imageList)
        return null;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {imageList.map((image, index) => <Picture key={index} pictureId={image.id} />)}
            </GridList>
        </div>
    );
}