import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "2.5rem",
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

function getStyles(tag, tagName, theme) {
    return {
      fontWeight:
        tagName.indexOf(tag) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

const tags = [
    'Vegan',
    'Jocke',
    'Coder',
    'Cooking',
  ];

export default function SimpleSelect() {
    const theme = useTheme();
  const classes = useStyles();
  const [distance, setDistance] = React.useState('');
  const [fame, setFame] = React.useState('');
  const [tagName, setTagName] = React.useState([]);

  const handleChangeOnDistance = (event) => {
      setDistance(event.target.value);
  }

  const handleChangeOnFame = (event) => {
    setFame(event.target.value);
    }

    const handleTag = (event) => {
        setTagName(event.target.value);
    };

  return (
    <div>
      <FormControl color='secondary' variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Distance</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={distance}
          onChange={handleChangeOnDistance}
          label="distance"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>0-50km</MenuItem>
          <MenuItem value={20}>50-200km</MenuItem>
          <MenuItem value={30}>more than 200km</MenuItem>
        </Select>
      </FormControl>
      <FormControl color='secondary' variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Fame</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={fame}
          onChange={handleChangeOnFame}
          label="fame"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>0-50❤️</MenuItem>
          <MenuItem value={20}>50-100❤️</MenuItem>
          <MenuItem value={30}>100❤️</MenuItem>
          <MenuItem value={40}>Jocke❤️❤️❤️</MenuItem>
        </Select>
      </FormControl>
      <FormControl color='secondary' className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={tagName}
          onChange={handleTag}
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
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag} style={getStyles(tag, tagName, theme)}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}