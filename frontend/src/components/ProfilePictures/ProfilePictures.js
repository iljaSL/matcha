import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {PictureDropZone} from '../ProfileCreation/CreateProfileFields'
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";


const ProfilePictures = () => {

    const readImages = (profilePictures) => {
        profilePictures.forEach(async picture => {
            const {data} = await axios.get(`http://localhost:3001/api/images/${picture.id}`)
            let { imageId, imageBlob} = data;
            const imageData = `data:image/jpeg;base64,${imageBlob}`
            setPictureBlobs(pictureBlobs => [...pictureBlobs, imageData])
        })
    }

    const [profilePictures, setProfilePictures] = useState([])
    const [pictureBlobs, setPictureBlobs] = useState([])
    const [fileArray, setFileArray] = useState([])
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        const fetchImageData = async () => {
            setProfilePictures((await axios.get(`http://localhost:3001/api/users/${user.id}/images`)).data)
        }
        if (user.id) {
            fetchImageData();
        }
        if (profilePictures.length > 0)
           readImages(profilePictures)
    }, [user, profilePictures.length])


    const handleDropZone = files => {
        setFileArray(files);
    }
    const reset = () => {
        setProfilePictures([])
        setPictureBlobs([])
        setFileArray([])
    }

    const readFile = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = () => reject(reader.error.message);
            reader.onload = () => {
                resolve(reader.result)
            };
            if (file) reader.readAsDataURL(file);
        });
    }

    const handleUpload = async () => {
        let base64Array = [];
        for (const file of fileArray) {
            const base64Picture = await readFile(file);
            base64Array.push(base64Picture);
        }
        const response = await axios.put(`http://localhost:3001/api/users/${user.id}/images`, {profilePic: base64Array})
        console.log(response)
        if (response.status === 201) return <Redirect to='/'/>
        else reset();

    }


    const handleDelete = () => {}

    if (pictureBlobs.length === profilePictures.length) return <>
        <PictureDropZone
        handleUpload={handleDropZone}
        initialFiles={pictureBlobs}
        handleDelete={handleDelete}/>
    <Button variant="contained" color="secondary" onClick={() => reset()}>Reset</Button><Button onClick={() => handleUpload()} variant="contained" color="primary">Apply</Button>
    </>
    else return <p>loading...</p>
}

export default ProfilePictures