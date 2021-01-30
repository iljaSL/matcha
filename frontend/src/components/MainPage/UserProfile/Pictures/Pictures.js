import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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


const tileData = [
    {
        img: 'https://images.unsplash.com/photo-1610976792422-36d647abf7ac?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title: 'Image1',
        author: 'author1',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1610948409536-4aa96bc76988?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title: 'Image2',
        author: 'author2',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1610984404810-f917a18c9d36?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2M3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title: 'Image3',
        author: 'author3',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1611020915878-7ffbba3a5f62?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title: 'Image4',
        author: 'author4',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1610983881213-db786dba17c5?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDN8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title: 'Image5',
        author: 'author5',
        featured: true,
    },
];


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