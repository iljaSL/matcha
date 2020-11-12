import {initialSteps} from "../components/ProfileCreation/ProfileFormUtils";

const initialState = {
    currentStep: 0,
    gender: 'female',
    preferences: ['female', 'male', 'other'],
    bio: '',
    tagList: [],
    profilePic: '',
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
            // if profilePic = OK
            // success
            return;
        case 5:
            formData.steps[4].success = !(formData.steps.map(step => step.success !== true));
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
            return {...state, signupSuccess: true}
        case 'VALIDATE_STEPS':
                return state
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

export const submitProfileForm = (formData) => {
    return dispatch => {
        // add to db w/ thunk here
        // if OK, then
        dispatch({type: 'FORM_SUCCESS'})
        console.log('success', formData)
    }
}

export default registrationReducer