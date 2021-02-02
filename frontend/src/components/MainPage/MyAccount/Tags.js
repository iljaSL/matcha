import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import updateUserAction from '../../../actions/updateUserAction';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    outlined: {
        outline: "solid",
        outlineWidth: "1px",
        color: "#f50057",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'vegan',
    'bodybuilding',
    'yoga',
    'design',
    'coffee',
    'programming',
    'cybersecurity',
  ];

function getStyles(name, tags, theme) {
    return {
      fontWeight:
        tags.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const Tags = () => {
  const classes = useStyles();
  const theme = useTheme();
  const form = useRef();

  const [tags, setTags] = React.useState([]);
  const [successful, setSuccessful] = useState(false);
  
  const dispatch = useDispatch();

  const onChangeTags = (e) => {
    const tags = e.target.value;
    setTags(tags);
  }

  const handleTagsChange = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    dispatch(updateUserAction.updateTags(tags)).then(() => {
      setSuccessful(true);
    }).catch(() => {
      setSuccessful(false);
    })
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.outlined}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
        Update your Tags
        </Typography>
        <Form onSubmit={handleTagsChange} ref={form} className={classes.form} noValidate>
        {!successful && (
            <FormControl color="secondary" className={classes.formControl}>
                <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={tags}
                onChange={onChangeTags}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, tags, theme)}>
                    #{name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Tags;