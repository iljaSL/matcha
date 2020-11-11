import React, {useState} from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Checkbox from '@material-ui/core/Checkbox';

import {DropzoneArea} from "material-ui-dropzone";

const CreateProfileForm = () => {

    const RedText = withStyles({
        root: {
            color: "#FF0000"
        }
    })(Typography);


    const initialSteps = [
        {
            name: 'Select your gender',
            success: false
        },
        {
            name: 'Select your sexual preferences',
            success: false
        },
        {
            name: 'Write a short bio',
            success: false
        },
        {
            name: 'Select your interests',
            success: false,
        },
        {
            name: 'Upload your profile picture',
            success: false
        },
        {name: 'Finished!', success: false},]

    const genderList = ['male', 'female', 'nb']

    const initialTags = [
        'psychedelic rock',
        'krautrock',
        'progressive rock',
        'stoner rock',
        'harsh noise',
        'doom metal',
    ]

    const [fieldData, setData] = useState({
        currentStep: 0,
        gender: 'female',
        preferences: ['female', 'male', 'nb'],
        bio: '',
        tagList: [],
        profilePic: '',
        signupSuccess: false,
        steps: initialSteps
    })


    const next = () => setData({...fieldData, currentStep: fieldData.currentStep + 1})


    const prev = () => setData({...fieldData, currentStep: fieldData.currentStep - 1})


    const jump = (label) => setData({...fieldData, currentStep: label})

    const handleChange = input => e => {
        setData({...fieldData, [input]: e.target.value})
    }

    const handleSubmit = () => {
        setData({...fieldData, signupSuccess: true})
        alert('OMG YOU MADE IT')
    }

    const {currentStep, steps, gender, preferences, bio, tagList, profilePic, signupSuccess} = fieldData;

    const handleSwitch = (gender) => {
        const newList = preferences.indexOf(gender) === -1
            ? preferences.concat(gender)
            : preferences.filter(item => item !== gender)
        setData({...fieldData, preferences: newList})
    }

    const handleListItem = (item) => {
        const newList = (tagList.indexOf(item) === -1)
            ? tagList.concat(item)
            : tagList.filter(tag => tag !== item)
        setData({...fieldData, tagList: newList})
    }

    const getStepContent = (currentStep) => {
        switch (currentStep) {
            case 0:
                return (
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Your gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange('gender')}>
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            <FormControlLabel value="nb" control={<Radio/>} label="Other"/>
                        </RadioGroup>
                    </FormControl>
                )
            case 1:
                return (
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

                )
            case 2:
                return (
                    <div>
                        <TextField id="bio" onChange={handleChange('bio')} value={bio}
                                   placeholder="Write a short bio here!" variant="filled" multiline rows={8}/>
                        {bio.length > 140
                            ? <RedText variant="subtitle2">{bio.length} </RedText>
                            : <Typography variant="subtitle2">{bio.length} </Typography>}
                        <Typography variant="subtitle2"> / 140</Typography>
                    </div>
                )
            case 3:
                return (
                    <List>
                        {initialTags.map((tag, index) =>
                            <ListItem key={index} onClick={() => handleListItem(tag)}>
                                <Checkbox edge="start" checked={tagList.indexOf(tag) !== -1}/>
                                {tag}
                            </ListItem>
                        )}
                    </List>
                )
            case 4:
                return (
                    <DropzoneArea
                        acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
                        onChange={(files) => console.log(files)}/>
                )
            case 5:
                return (
                    <div>
                        So you're a human / robot identifying as a <b> {gender} </b>
                        interested in {Object.keys(preferences).length === 3 ? 'all' : 'some'} genders
                    </div>
                )
            default:
                return (<div>wtf</div>)
        }
    }
    return (
        <div>
            <Stepper activeStep={currentStep}>
                {steps.map((entry, index) =>
                    <Step key={entry.name}>
                        <StepLabel onClick={() => jump(index)}>{entry.name}</StepLabel>
                    </Step>
                )}
            </Stepper>
            {getStepContent(currentStep)}
            {currentStep > 0 ? <Button onClick={prev}>previous</Button> : null}
            {currentStep === steps.length - 1 ? <Button onClick={handleSubmit}>submit</Button> :
                <Button onClick={next}>next</Button>}
        </div>
    )
}

export default CreateProfileForm;