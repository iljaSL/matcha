import React, { useState, useEffect } from 'react';

const Chat = ({socket}) => {
    const [response, setResponse] = useState('')



    const handleStart = () => isActive ? setIsActive(false) : setIsActive(true);

    useEffect(() => {
        socket.on("FromAPI", data => {
            setResponse(data);
        }, [])
    })

    return (
        <p>
            Now it is <time dateTime={response}>{response}</time>
        </p>
    )
}

export default Chat;