import React, { useState, useEffect } from 'react';
import Conversation from './Conversation'

const Chat = ({socket}) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [conversations, setConversations] = useState('')
    const [currentConversation, setCurrentConversation] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        socket.emit("setUserData", userData);
    }, [])

    useEffect(() => {
        socket.on("getTime", data => {
            setTime(data);
        })
        socket.on('conversationList', conversations => setConversations(conversations))
    }, [])

    return (
        <>
            {conversations && conversations.map(conversation =>
                <div key={conversation.id}>CONVERSATION BETWEEN {conversation.user1} AND {conversation.user2}
                    <button onClick={() => setCurrentConversation(conversation)}>open</button>
                </div>
            )}
            <br/>
            {currentConversation &&
            <Conversation socket={socket} id={currentConversation.id} />}
            {userData.id} at {time}
        </>
    )
}

export default Chat;