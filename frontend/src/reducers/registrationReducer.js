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

export const submitProfileForm = (formData) => {
    return dispatch => {
        // add to db w/ thunk here
        // if OK, then
        dispatch({type: 'FORM_SUCCESS'})
        console.log('success', formData)
    }
}

export default registrationReducer