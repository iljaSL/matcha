import React, {useState} from 'react';

const MessageBar = ({conversationId, senderId, socket}) => {

    const [message, setMessage] = useState('');

    const handleSubmit = (ev) => {
        ev.preventDefault();
        socket.emit('newMessage', {message, conversationId, senderId});
        setMessage('')
    }

    const handleChange = (ev) => setMessage(ev.target.value)

    if (!conversationId) return null;

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={handleChange} />
            <input type="submit" />
        </form>
    )
}

export default MessageBar