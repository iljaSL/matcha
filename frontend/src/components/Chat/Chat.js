import React, { useState, useEffect } from 'react';
import Conversation from './Conversation'
import MessageBar from './MessageBar'

const Chat = ({socket}) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [conversations, setConversations] = useState('')
    const [messages, setMessages] = useState([])
    const [time, setTime] = useState('')
    const [currentConversationId, setCurrentConversationId] = useState('')

    useEffect(() => {
        socket.emit("setUserData", userData);
    }, [])

    useEffect(() => {
        socket.on("getTime", data => {
            setTime(data);
        })
        socket.on('conversationList', conversations => setConversations(conversations))
        socket.on('conversation', messages => setMessages(messages))

        if (currentConversationId)
            socket.emit('getConversation', currentConversationId)
    })

    const getMessages = (id) => {
        setCurrentConversationId(id);
    }

    return (
        <>
            {conversations && conversations.map(conversation =>
                <div key={conversation.id}>CONVERSATION BETWEEN {conversation.user1} AND {conversation.user2}
                    <button onClick={() => {getMessages(conversation.id)}}>open</button>
                </div>
            )}
            <br/>
            {messages &&
                <>
                    <Conversation conversation={messages} userId={userData.id} />
                    <MessageBar socket={socket} conversationId={currentConversationId} senderId={userData.id} />
                </>
            }
            {userData.id} at {time}
        </>
    )
}

export default Chat
