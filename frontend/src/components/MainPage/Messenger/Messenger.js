import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import {useSelector} from 'react-redux'
import axios from "axios";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    divider: {
        marginTop: '3rem'
    }
});

const ConversationEntry = ({conversationUser, handleConversation, current}) => {
    const [profilePic, setProfilepic] = useState('')
    useEffect(() => {
        const getPic = async () => {
            setProfilepic((await axios.get(`http://localhost:3001/api/images/${conversationUser.profilePicId}`)).data.imageBlob)
        }
        getPic();
    }, [])
    return <>
        <ListItem selected={current} button key={conversationUser.id} onClick={() => handleConversation(conversationUser)}>
            <ListItemIcon>
                <Avatar alt={conversationUser.username} src={`data:image/png;base64, ${profilePic}`}/>
            </ListItemIcon>
            <ListItemText primary={conversationUser.username}>{conversationUser.username}</ListItemText>
            <ListItemText secondary="online" align="right"></ListItemText>
        </ListItem>
        <Divider/>
    </>
}


const ConversationList = ({conversations, userId, handleConversation, currentConversationId}) => {

    const classes = useStyles();

    return <Grid item xs={3} className={classes.borderRight500}>
        <List>
            {conversations && conversations.map(conversation => {
                const conversationUser = conversation.user1 === userId
                    ? {
                        userId: conversation.user2,
                        firstName: conversation.user2_firstname,
                        lastName: conversation.user2_lastname,
                        username: conversation.user2_username,
                        profilePicId: conversation.user2_profilepic
                    }
                    : {
                        userId: conversation.user1,
                        firstName: conversation.user1_firstname,
                        lastName: conversation.user1_lastname,
                        username: conversation.user1_username,
                        profilePicId: conversation.user1_profilepic
                    }
                conversationUser.conversationId = conversation.id
                if (currentConversationId === conversation.id)
                    return <ConversationEntry key={conversation.id} conversationUser={conversationUser}
                                              handleConversation={handleConversation} current/>
                return <ConversationEntry key={conversation.id} conversationUser={conversationUser}
                                          handleConversation={handleConversation}/>

            })
            }
        </List>
    </Grid>
}

const TextBar = ({socket, conversationId, senderId, receiverId}) => {
    const [message, setMessage] = useState('');

    const handleChange = (ev) => setMessage(ev.target.value)

    const handleSubmit = (ev) => {
        ev.preventDefault();
        socket.emit('newMessage', {message, conversationId, senderId, receiverId});
        setMessage('')
    }

    return <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
            <TextField color="secondary"
                       id="outlined-basic-email"
                       label="Type Something"
                       onChange={handleChange}
                       value={message}
                       fullWidth />
        </Grid>
        <Grid item xs={1} align="right">
            <div onClick={handleSubmit}><Fab color="secondary" aria-label="add"><SendIcon/></Fab></div>
        </Grid>
    </Grid>
}

const MessageHistory = ({messages, userId, socket, currentConversationId, receiver}) => {
    const classes = useStyles();
    return <Grid item xs={9}>
        <List className={classes.messageArea}>
            {messages.map(message => {
                const align = message.sender == userId ? 'right' : 'left'
                return <ListItem key={message.id}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText align={align} primary={message.message}></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            })
            }
        </List>
        {currentConversationId && <TextBar socket={socket}
                 conversationId={currentConversationId}
                 senderId={userId}
                 receiverId={receiver}/>}
    </Grid>
}

const Messenger = ({socket}) => {
    const classes = useStyles();
    const {user} = useSelector(state => state.auth)
    const [conversations, setConversations] = useState('')
    const [messages, setMessages] = useState([])
    const [currentConversationId, setCurrentConversationId] = useState('')
    const [receiver, setReceiver] = useState('')
    useEffect(() => {
        socket.on('conversationList',
            (conversations) => {
                setConversations(conversations)
            }
        )
        socket.on('conversation', messages => {
                if (messages[0] && messages[0].conversation_id === currentConversationId) {
                    setMessages(messages)
                } else
                    ; // TODO: notify user about new message in another chat
            }
        )
        if (currentConversationId)
            socket.emit('getConversation', currentConversationId)

        socket.on('my error', (error) => console.log(error));
    })

    const handleConversation = (conversationUser) => {
            setCurrentConversationId(conversationUser.conversationId)
            setReceiver(conversationUser.userId)
    }


    return (
        <div>
            <Navbar/>
            <Grid container className={classes.divider}>
                <Grid item xs={12}>
                    <Typography color="secondary" variant="h5" className="header-message">Messenger</Typography>
                    <Grid container component={Paper} className={classes.chatSection}>
                        <ConversationList conversations={conversations}
                                          handleConversation={handleConversation}
                                          userId={user.id}
                                          currentConversationId={currentConversationId}/>
                        <MessageHistory messages={messages}
                                        userId={user.id}
                                        socket={socket}
                                        currentConversationId={currentConversationId}
                                        receiver={receiver}/>
                    </Grid>
                </Grid>
                <Divider/>

            </Grid>
            <Footer/>
        </div>
    );
}

export default Messenger;
