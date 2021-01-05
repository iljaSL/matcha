import React, { useEffect, useState } from 'react';

const Conversation = ({socket, id}) => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const [conversation, setConversation] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        socket.emit('getConversation', id)
        socket.on('conversation', messages => setConversation(messages))
    })

    const handleSubmit = (ev) => {
        ev.preventDefault();
        socket.emit('newMessage', { message, conversationId: id, senderId: userData.id});
        socket.emit('getConversation', id)
        socket.on('conversation', messages => setConversation(messages))
        setMessage('')
    }

    return <div>
        {conversation &&
        conversation.map(message => {
                return <div key={message.id}><b>{message.message} by {message.sender}</b></div>
        })
        }
        {!conversation &&
        <div>no conversation yet, why don't you start one?</div>}

        <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={event => setMessage(event.target.value)}/>
        <input type="submit" value="send" />
        </form>
    </div>

}

export default Conversation