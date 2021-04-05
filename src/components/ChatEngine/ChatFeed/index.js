import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from '../../Context'

import { getLatestMessages, readMessage } from '../../../actions/messages'

import { AuthFail, ConnectionBar, Welcome } from './Steps'

import ChatHeader from './ChatHeader'
import MessageLoader from './MessageLoader'
import Messages from './Messages'
import SendingMessages from './Messages/SendingMessages'
import Typers from './Typers'
import NewMessageForm from './NewMessageForm'

import _ from 'lodash'

import { animateScroll } from "react-scroll"

const initial = 45
let count = initial
const interval = 33

const ChatFeed = props => {
    const didMountRef = useRef(false)
    const [duration, setDuration] = useState(0)
    const [currentChat, setCurrentChat] = useState(null)
    const [currentTime, setCurrentTime] = useState(Date.now())
    const { 
        conn,
        chats, setChats,
        sendingMessages,
        messages, setMessages,
        activeChat, setActiveChat,
        loadMoreMessages, setLoadMoreMessages,
    } = useContext(ChatEngineContext)

    function onReadMessage(chat) {
        if (chats) {
            const newChats = {...chats}
            newChats[chat.id] = chat
            setChats(newChats)
        }
    }

    function onGetMessages(chatId, messages) {
        setMessages(_.mapKeys(messages, 'id'))

        if (messages.length > 0) {
            const message = messages[messages.length - 1]

            if (props.userName && props.userName !== message.sender_username) {
                readMessage(conn, chatId, message.id, (chat) => onReadMessage(chat))
            }
        }
        
        props.onGetMessages && props.onGetMessages(chatId, messages)
    }

    function loadMessages(loadMoreMessages) {
        // Message Loader triggers
        if (loadMoreMessages) { 
            setLoadMoreMessages(false)
            count = count + interval
            getLatestMessages(conn, activeChat, count, (chatId, messages) => onGetMessages(chatId, messages))

        // Active Chat passed by context
        } else if (conn && !props.activeChat && activeChat !== null && activeChat !== currentChat) {
            count = initial
            setCurrentChat(activeChat)
            getLatestMessages(conn, activeChat, count, (chatId, messages) => onGetMessages(chatId, messages))

        // Active Chat passed by props
        } else if (conn && props.activeChat && props.activeChat !== currentChat) {
            count = initial
            setActiveChat(props.activeChat)
            setCurrentChat(props.activeChat)
            getLatestMessages(conn, props.activeChat, count, (chatId, messages) => onGetMessages(chatId, messages))
        }
    }

    useEffect(() => { loadMessages(false) }, [conn, activeChat, currentChat])
    useEffect(() => { loadMessages(loadMoreMessages) }, [loadMoreMessages])

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setTimeout(() => {
                setDuration(100)
            }, 3000) // Start animating scroll post-load
            setInterval(() => {
                setCurrentTime(Date.now())
            }, 1000) // Check time every second

        } else {
            // Scroll on new incoming messages
            if(!_.isEmpty(messages) && !loadMoreMessages) {
                animateScroll.scrollToBottom({
                    duration,
                    containerId: "ce-feed-container"
                })
            }
        }
    }, [sendingMessages, messages])


    const chat = chats && chats[currentChat] 

    if(props.renderChatFeed) {
        return props.renderChatFeed(props)
    
    } else if (conn === undefined) {
        return <AuthFail />
    
    } else if (conn && chats !== null && _.isEmpty(chats)) {
        return <Welcome />
    }

    return (
        <div 
            className='ce-chat-feed'
            style={{ height: '100%', maxHeight: '100vh', backgroundColor: '#f0f0f0' }}
        >
            { props.renderChatHeader ?  props.renderChatHeader(chat) : <ChatHeader /> }

            <div
                id='ce-feed-container'
                style={styles.feedContainer} 
                className='ce-chat-feed-container'
            >
                <div style={{ height: '88px' }} className='ce-feed-container-top' />

                { Object.keys(messages).length > 0 && <MessageLoader /> }

                <Messages {...props} />

                <SendingMessages {...props} />

                <Typers currentTime={currentTime} />

                <ConnectionBar />

                <div style={{ height: '54px' }} className='ce-feed-container-bottom' />
            </div>

            { props.renderNewMessageForm ? props.renderNewMessageForm(props, currentChat) : <NewMessageForm /> }
        </div>
    )
}

export default ChatFeed

const styles = {
    feedContainer: { 
        width: '100%',
        height: '100%',
        maxHeight: '100vh',
        overflowX: 'hidden',
        overflowY: 'scroll',
        backgroundColor: 'white',
    }
}