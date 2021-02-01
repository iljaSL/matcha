import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import {genderList} from "./ProfileFormUtils";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import {DropzoneArea} from "material-ui-dropzone";


import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";

const RedText = withStyles({
    root: {
        color: "#FF0000"
    }
})(Typography);


export const ChooseGender = ({gender, handleChange}) =>
    <FormControl component="fieldset">
        <FormLabel component="legend">Your gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange('gender')}>
            <FormControlLabel value="man" control={<Radio/>} label="Man"/>
            <FormControlLabel value="woman" control={<Radio/>} label="Woman"/>
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

export const ChooseTags = ({handleListItem, tagList, initialTags}) => {
    return <List>
        {initialTags.map((tag, index) =>
            <ListItem key={index} onClick={() => handleListItem(tag.id)}>
                <Checkbox edge="start" checked={tagList.indexOf(tag.id) !== -1}/>
                #{tag.tag}
            </ListItem>
        )}
    </List>
}
export const PictureDropZone = ({handleUpload, initialFiles, handleDelete}) => {
    if (!initialFiles)
        initialFiles = [];
    return (
        <DropzoneArea
            acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
            maxFileSize={47000000}
            filesLimit={5}
            initialFiles={initialFiles}
            clearOnUnmount={true}
            onChange={async (files) => handleUpload(files)}
            onDelete={() => handleDelete('profilePic')}
        />
    )
}


export const FinalPage = ({formData}) => { // why don't we sketch a 'tinder card' here?
    const {profilePic, preferences, bio, tagList, gender} = formData
    return <Card style={{height: '80vh', width: 'auto'}}>
        {profilePic[0]?
            <CardMedia image={profilePic[0]} style={{height: '80%', width: '80%'}}/>
            : <div>need to add a skeleton here</div>}
        <CardContent>
            <Typography>
                So you're a {gender} looking for company from {preferences.map(pref => `${pref}s `)}
                interested in {tagList.map(tag => `${tag} `)} with the bio {bio}.
                Is that correct?
            </Typography>
        </CardContent>
    </Card>
}