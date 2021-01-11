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

const Footer = () => {
    const classes = useStyles();
    return(
      <footer className={classes.footer}>
        <Typography color="secondary" variant="h6" align="center" gutterBottom>
          Matcha Copyright © {''}
          <Link color="inherit" href="https://www.hive.fi/en/">
          your favorite Matcha team!
        </Link>{' '}
        </Typography>
      </footer>
    )
}

export default Footer;

