import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import authAction from '../../actions/resetPassword'

const ValidateProfile = () => {
    const { validationId } = useParams();
    const dispatch = useDispatch();
    dispatch(authAction.validateProfile(validationId));

    return <Redirect to="/" />
}

export default ValidateProfile
