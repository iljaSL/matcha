import axios from 'axios';

export const initialSteps = [
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
    {name: 'Finished!', success: false},
]

export const genderList = ['male', 'female', 'other']

