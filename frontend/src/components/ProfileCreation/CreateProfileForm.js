import React, {useEffect} from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'


import {useSelector, useDispatch} from 'react-redux'

import {
    changePage,
    updateField,
    submitProfileForm,
    checkFormValidity,
    addProfilePicture
} from '../../reducers/registrationReducer'

import {Bio, ChooseGender, ChoosePreferredGender, ChooseTags, FinalPage, PictureDropZone} from './CreateProfileFields'

const CreateProfileForm = () => {

    const dispatch = useDispatch()


    const registrationData = useSelector(state => state.registration)
    const userData = JSON.parse(localStorage.getItem('user'));
    const {currentStep, preferences, bio, tagList, gender, profilePic, steps} = registrationData

    useEffect(() => {
        dispatch(checkFormValidity(registrationData))
    }, [dispatch, registrationData])

    const next = () => {
        dispatch(changePage(registrationData.currentStep + 1))
    }

    const prev = () => dispatch(changePage(registrationData.currentStep - 1))

    const jump = (page) => dispatch(changePage(page))

    const checkError = (index) => {
        if (currentStep > index)
            return !registrationData.steps[index].success
        else
            return false;
    }

    const handleChange = input => e => {
        dispatch(updateField(input, e.target.value))
    }

    const handleUpload = base64String => {
        dispatch(addProfilePicture(base64String))
    }

    const handleSubmit = () => {
        dispatch(submitProfileForm(registrationData, userData))
    }

    const handleDelete = (field) => {
        dispatch(updateField(field, null))
    }


    const handleSwitch = (gender) => {
        const newList = preferences.indexOf(gender) === -1
            ? preferences.concat(gender)
            : preferences.filter(item => item !== gender)
        dispatch(updateField(Object.keys({preferences})[0], newList)) // unnecessary workaround to get variable name as as string
    }

    const handleListItem = (item) => {
        const newList = (tagList.indexOf(item) === -1)
            ? tagList.concat(item)
            : tagList.filter(tag => tag !== item)
        dispatch(updateField(Object.keys({tagList})[0], newList))
    }

    const StepNavigation = () =>
        <div>
            {currentStep > 0 ? <Button onClick={prev}>previous</Button> : null}
            {currentStep === steps.length - 1 ? <Button onClick={handleSubmit}>submit</Button> :
                <Button onClick={next}>next</Button>}
        </div>

    const getStepContent = (currentStep) => {
        switch (currentStep) {
            case 0:
                return <ChooseGender gender={gender} handleChange={handleChange}/>
            case 1:
                return <ChoosePreferredGender gender={gender} preferences={preferences} handleSwitch={handleSwitch}/>
            case 2:
                return <Bio bio={bio} handleChange={handleChange}/>
            case 3:
                return <ChooseTags handleListItem={handleListItem} tagList={tagList}/>
            case 4:
                return <PictureDropZone handleUpload={handleUpload} initialFile={profilePic}
                                        handleDelete={handleDelete}/>
            case 5:
                return <FinalPage formData={registrationData}/>
            default:
                return <div></div>
        }
    }
    if (userData.status === 2)
        return <Redirect to="/gallery"/>
    else
        return (
            <div>
                <h3>Welcome to Matcha {userData.username}! Let's get started with your profile creation...</h3>
                <Stepper
                    activeStep={currentStep}>
                    {steps.map((entry, index) => {
                            return (
                                <Step
                                    key={entry.name}>
                                    <StepLabel error={checkError(index)}
                                               onClick={() => jump(index)}>{entry.name}</StepLabel>
                                </Step>
                            )
                        }
                    )}
                </Stepper>
                {getStepContent(currentStep)}
                <StepNavigation/>
            </div>
        )
}

export default CreateProfileForm;