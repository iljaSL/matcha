import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(6),
      },
  }));

const UserProfile = () => {
    const classes = useStyles();
    return(
        <>
            <h1>Hello</h1>
        </>
    )
}

export default UserProfile;

