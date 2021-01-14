import {initialSteps} from "../components/ProfileCreation/ProfileFormUtils";
import axios from 'axios';
import React from "react";

const initialState = {
    currentStep: 0,
    gender: 'female',
    preferences: ['female', 'male', 'other'],
    bio: '',
    tagList: [],
    initialTags: [],
    profilePic: '',
    profileBlob: '',
    signupSuccess: false,
    steps: initialSteps
}

const checkFieldValidity = (formData) => {
    switch (formData.currentStep) {
        case 0:
            formData.steps[0].success = !!formData.gender;
            return;
        case 1:
            formData.steps[1].success = formData.preferences.length > 0;
            return;
        case 2:
            formData.steps[2].success = formData.bio.length > 0 && formData.bio[0].length <= 140;
            return;
        case 3:
            formData.steps[3].success = formData.tagList.length > 0;
            return;
        case 4:
            formData.steps[4].success = !!formData.profilePic;
            return;
        case 5:
            formData.steps[5].success = !(formData.steps.map(step => step.success !== true));
            return;
        default:
            return;
    }
}

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHOOSE_GENDER':
            return {
                ...state,
                gender: action.data,
                steps: state.steps.map((step, index) => index === 0 ? {...step, success: true} : step)
            }
        case 'UPDATE_FIELD':
            const { field, value } = action.data
            return {...state, [field]: value}
        case 'CHANGE_PAGE':
            return {...state, currentStep: action.data}
        case 'FORM_SUCCESS':
            return {...state, signupSuccess: action.data}
        case 'GET_TAGS':
            return {...state, initialTags: action.data}
        case 'VALIDATE_STEPS':
                return state;
        default:
            return state;
    }
}

export const changePage = (newPage) => {
    return dispatch => {
        dispatch({type: 'CHANGE_PAGE', data: newPage})
    }
}

export const updateField = (field, value) => {
    return dispatch => {
        dispatch({type: 'UPDATE_FIELD', data: {field: field, value: value}})

    }
}

export const checkFormValidity = (formData) => {
    return dispatch => {
        const validatedFormData = checkFieldValidity(formData)
        dispatch({type: 'VALIDATE_STEPS', data: validatedFormData})
    }
}
const readFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(reader.error.message);
        reader.onload = () => {
            resolve(reader.result)
        };
        reader.readAsDataURL(file);
    });
}
export const addProfilePicture =  (file) => {

    return async dispatch => {
        const base64Picture = await readFile(file);
        dispatch({type: 'UPDATE_FIELD', data: {field: 'profileBlob', value: base64Picture}})
        dispatch({type: 'UPDATE_FIELD', data: {field: 'profilePic', value: file}})
    }
}

export const submitProfileForm = (formData, userData) => {
    return async dispatch => {
        // a complicated way to check if all are ok...
        let success, response;
        if (!((formData.steps
            .map((step, index) => index < 5
                ? step.success
                : true))
            .every(value => value === true))) {
            alert('Error: Insert all the stuff');
            return;
        }
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
            response = await axios
                .post(`http://localhost:3001/api/users/profile/${userData.id}`, formData)
            success = true;
        } catch (error) {
            console.log(error)
        }
        const user = JSON.parse(localStorage.getItem("user"));
        user.status = 2;
        localStorage.setItem("user", JSON.stringify(user))
        dispatch({type: 'FORM_SUCCESS', data: success});
    }
}

export const getInitialTags = () => {
    return async dispatch => {
        try {
            //axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
            const response = await axios.get('http://localhost:3001/api/tags')
            dispatch({type: 'GET_TAGS', data: response.data})
        } catch (err) {
            dispatch({type: 'GET_TAGS', data: null})
        }
    }
}

export default registrationReducer