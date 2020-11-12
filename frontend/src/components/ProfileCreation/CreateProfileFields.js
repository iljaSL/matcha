import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import {genderList, initialTags} from "./ProfileFormUtils";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import {DropzoneArea} from "material-ui-dropzone";

const RedText = withStyles({
    root: {
        color: "#FF0000"
    }
})(Typography);


export const ChooseGender = ({gender, handleChange}) =>
    <FormControl component="fieldset">
        <FormLabel component="legend">Your gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange('gender')}>
            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
            <FormControlLabel value="other" control={<Radio/>} label="Other"/>
        </RadioGroup>
    </FormControl>

export const ChoosePreferredGender = ({gender, preferences, handleSwitch}) =>
    <FormControl component="fieldset">
        <FormLabel component="legend">Your preferred gender(s)</FormLabel>
        <FormGroup row>
            {genderList.map((gender, index) =>
                <FormControlLabel key={index} label={gender}
                                  control={<Switch checked={preferences.indexOf(gender) !== -1}
                                                   onChange={() => handleSwitch(gender)} edge="end"/>}/>
            )}
        </FormGroup>
    </FormControl>

export const Bio = ({bio, handleChange}) =>
    <div>
        <TextField id="bio" onChange={handleChange('bio')} value={bio}
                   placeholder="Write a short bio here!" variant="filled" multiline rows={8}/>
        {bio.length > 140
            ? <RedText variant="subtitle2">{bio.length} </RedText>
            : <Typography variant="subtitle2">{bio.length} </Typography>}
        <Typography variant="subtitle2"> / 140</Typography>
    </div>

export const ChooseTags = ({handleListItem, tagList}) =>
    <List>
        {initialTags.map((tag, index) =>
            <ListItem key={index} onClick={() => handleListItem(tag)}>
                <Checkbox edge="start" checked={tagList.indexOf(tag) !== -1}/>
                {tag}
            </ListItem>
        )}
    </List>

export const PictureDropZone = () =>
    <DropzoneArea
        acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
        onChange={(files) => console.log(files)}/>

export const FinalPage = ({formData}) => {
    console.log(formData)
    return <div>made it!</div>
}