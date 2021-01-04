import React, { useState, useEffect } from 'react';

const Chat = ({socket}) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [conversations, setConversations] = useState('')
    const [time, setTime] = useState('')


    const handleStart = () => isActive ? setIsActive(false) : setIsActive(true);

    useEffect(() => {
        socket.emit("setUserData", userData);
        socket.on("getTime", data => {
            setTime(data);
        })
        socket.on('conversationList', conversations => setConversations(conversations))
    }, [])

    return (
        <p>
            {conversations && conversations.map(conversation => {
                return <b key={conversation.id}>CONVERSATION BETWEEN {conversation.user1} AND {conversation.user2}<br /> </b>
            })}
            <br />
            {userData.id} at {time}
        </p>
    )
}

export default Chat;