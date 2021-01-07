import React from 'react';

const Conversation = ({conversation, userId}) => {
    return <div>
        {conversation &&
        conversation.map(message =>
            message.sender === userId
                ? <div key={message.id}><b>{message.message} by {message.sender}</b></div>
                : <div key={message.id}>{message.message} by {message.sender}</div>
        )
        }
    </div>
}

export default Conversation