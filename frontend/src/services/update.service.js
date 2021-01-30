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

const updatePreference = async (preference) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "sexual_orientation",
        sexual_orientation: preference
    })
    return result.data;
}

const updateMail = async (mail) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "mail",
        mail: mail
    })
    return result.data;
}

const updatePassword = async (oldPassword, newPassword) => {
    const result = await axios.post(`${baseUrl}/users/updateUser`, {
        key: "password",
        oldPassword: oldPassword,
        newPassword: newPassword
    })
    return result.data;
}

const updateTags = async (tags) => {
    let id = window.localStorage.getItem('user');
    const result = await axios.post(`${baseUrl}/tags/updateTag/${id.id}`, {
        tag: tags
    })
    return result.data;
}

const deleteUser = async () => {
    let id = window.localStorage.getItem('user');
    localStorage.removeItem('user');
    await axios.delete(`${baseUrl}/users/${id.id}`)
}

export default {
    updateTags,
    updateFirstLastName,
    updateBio,
    updateGender,
    updatePreference,
    updateMail,
    updatePassword,
    deleteUser,
}