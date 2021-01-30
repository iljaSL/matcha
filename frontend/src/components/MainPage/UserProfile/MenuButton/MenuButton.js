import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    marginLeft: '2rem',
    },
}));

export default function MenuButton({handleBlock, handleReport}) {
    const classes = useStyles();

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
            <React.Fragment>
            <Button className={classes.root} variant="contained" color="secondary" {...bindTrigger(popupState)}>
                ...
            </Button>
            <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={handleBlock}>Block User</MenuItem>
                <MenuItem onClick={handleReport}>Report User</MenuItem>
            </Menu>
            </React.Fragment>
        )}
        </PopupState>
    );
}