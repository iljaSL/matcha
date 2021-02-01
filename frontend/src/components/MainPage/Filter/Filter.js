import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Slider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "2.5rem",
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
  chipMargin: {
    marginBottom: '5px'
  },
  slider: {
    width: '30%',
  }
}));

export default function SimpleSelect({distance, handleDistance, handleSort, sort, genderList, handleFilter, selectedGenders}) {
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
      <br />


      <FormControl color='secondary' variant="outlined" className={classes.formControl}>
      {genderList.map((gender, index) => <li key={index}>
        <Chip clickable
              className={classes.chipMargin}
              value={gender}
              label={gender}
              color={selectedGenders.includes(gender) ? "default" : "secondary" }
              onClick={() => handleFilter(gender)}
        />
      </li>
      )}
      </FormControl>
      <br />

      <Slider
          className={classes.slider}
          color='secondary'
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