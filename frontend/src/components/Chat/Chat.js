import React, {useState, useEffect} from 'react';
import Conversation from './Conversation'
import MessageBar from './MessageBar'

const Chat = ({socket}) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const [conversations, setConversations] = useState('')
    const [messages, setMessages] = useState([])
    const [time, setTime] = useState('')
    const [currentConversationId, setCurrentConversationId] = useState('')
    const [receiver, setReceiver] = useState('')


    useEffect(() => {
        socket.emit("setUserData", userData);
    }, [])

    useEffect(() => {

        socket.on('conversationList',
            (conversations) => {
                setConversations(conversations)
            }
        )
        socket.on('conversation', messages => {
                if (messages[0].conversation_id === currentConversationId)
                    setMessages(messages)
                else
                    ; // TODO: notify user
            }
        )


        if (currentConversationId)
            socket.emit('getConversation', currentConversationId)

        socket.on('my error', (error) => console.log(error));
    })

    const getMessages = (conversation) => {
        setCurrentConversationId(conversation.id);
        setReceiver(userData.id !== conversation.user1 ? conversation.user1 : conversation.user2)
    }

    return (
        <>
            {conversations && conversations.map(conversation => {
                    return (
                        <div key={conversation.id}>CONVERSATION BETWEEN {conversation.user1} AND {conversation.user2}
                            <button onClick={() => {
                                getMessages(conversation)
                            }}>open
                            </button>
                        </div>
                    )
                }
            )}
            <br/>
            {messages &&
            <>
                <Conversation conversation={messages} userId={userData.id}/>
                <MessageBar socket={socket}
                            conversationId={currentConversationId}
                            senderId={userData.id}
                            receiverId={receiver}/>
            </>
            }
            {userData.id} at {time}
        </>
    )
}

export default Chat
