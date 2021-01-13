import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';

import Bio from './Bio/Bio';
// import Birthdate from './Birthdate';
// import Name from './Name';
// import Tag from './Tag';
// import Username from './Username';
// import SexPreference from './SexPreference';
// import Country from './Country';
// import Header from '../viewProfile/Header';


// const useStyles = makeStyles((theme) => ({
//     footer: {
//         padding: theme.spacing(6),
//       },
//   }));

const UserProfile = () => {


    return (
            <Grid container justify="center" style={{ paddingTop: '100px' }}>
                <Grid container item xs={12} sm={6} justify="center">
                    <Bio />
                   {/* <VisitHistory />
                   <Pictures />
                   <Likes />
                   <Fame /> */}
                </Grid>
            </Grid>
    );
};

export default UserProfile;