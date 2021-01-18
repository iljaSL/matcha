import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {PictureDropZone} from '../ProfileCreation/CreateProfileFields'

const ProfilePictures = () => {

    const [profilePictures, setProfilePictures] = useState([])
    const [pictureBlobs, setPictureBlobs] = useState([])
    const userData = JSON.parse(localStorage.getItem('user')) // TODO: replace with state
    useEffect(() => {
        const fetchImageData = async () => setProfilePictures((await axios.get(`http://localhost:3001/api/users/${userData.id}/images`)).data)
        if (userData) {
            fetchImageData();
        }
        if (profilePictures.length > 0) {
            profilePictures.forEach(async picture => {
                const {data} = await axios.get(`http://localhost:3001/api/images/${picture.id}`)
                let { imageId, imageBlob} = data;
                const imageData = `data:image/jpeg;base64,${imageBlob}`
                setPictureBlobs(pictureBlobs => [...pictureBlobs, imageData])
            })
        }
    }, [profilePictures.length])


    const handleUpload = () => { // TODO: add
    }

    const handleDelete = () => {

    }

    if (pictureBlobs.length === profilePictures.length) return <PictureDropZone handleUpload={handleUpload} initialFiles={pictureBlobs} handleDelete={handleDelete} />
    else return <p>loading...</p>
}

export default ProfilePictures