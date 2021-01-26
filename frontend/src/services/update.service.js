import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const updateFirstLastName = async (firstName, lastName) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "name",
        firstname: firstName,
        lastname: lastName
    })
    return result.data;
};

const updateBio = async (bio) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "bio",
        bio: bio
    })
    return result.data;
};

const updateGender = async (gender) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "gender",
        gender: gender
    })
    return result.data;
}

export default {
    updateFirstLastName,
    updateBio,
    updateGender,
}