import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import {Slider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "2.5rem",
    margin: theme.spacing(1),
    minWidth: 120,
    listStyle: 'none',
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
  


export default function SimpleSelect({distance, handleDistance, handleSort, sort, genderList, handleFilter, selectedGenders}) {
  const theme = useTheme();
  const classes = useStyles();


  return (
    <div>
      <FormControl color='secondary' variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleSort}
          label="Sort by"
          value={sort}
        >
          <MenuItem value={'default'}>Default</MenuItem>
          <MenuItem value={'score'}>Popularity️</MenuItem>
          <MenuItem value={'tags'}>Tags in common️</MenuItem>
          <MenuItem value={'distance'}>Distance️</MenuItem>
        </Select>
      </FormControl>


      <FormControl color='secondary' variant="outlined" className={classes.formControl}>
      {genderList.map((gender, index) => <li key={index}>
        <Chip clickable
              value={gender}
              label={gender}
              color={selectedGenders.includes(gender) ? "primary" : "secondary" }
              onClick={() => handleFilter(gender)}
        />
      </li>
      )}
      </FormControl>


      <Slider
          value={distance}
          onChange={handleDistance}
          step={20}
          marks={true}
          min={0}
          max={12742}
          valueLabelDisplay="on"
      />
    </div>
  );
}