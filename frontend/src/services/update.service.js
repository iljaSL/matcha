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

export default {
    updateFirstLastName,
}