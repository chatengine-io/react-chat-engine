import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext, getLatestMessages, readMessage } from 'react-chat-engine'

import { AuthFail, CreateChat, IceBreaker } from './Steps'

import { RenderTrigger } from './Triggers'

import ChatHeader from './ChatHeader'
import Messages from './Messages'
import SendingMessages from './SendingMessages'
import IsTyping from './IsTyping'
import NewMessageForm from './NewMessageForm'
import ConnectionBar from './ConnectionBar'

import _ from 'lodash'

import { animateScroll } from "react-scroll"

const initial = 45
let count = initial
const interval = 33

const ChatFeed = props => {
    const didMountRef = useRef(false)
    const [duration, setDuration] = useState(0)
    const [hasFetchedMessages, setHasFetchedMessages] = useState(false)
    const [currentChat, setCurrentChat] = useState(null)
    const { 
        conn,
        chats, setChats,
        sendingMessages,
        messages, setMessages,
        activeChat, setActiveChat,
        loadMoreMessages, setLoadMoreMessages,
        isBottomVisible,
        typingCounter
    } = useContext(ChatEngineContext)

    const typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : []

    function onReadMessage(chat) {
        if (chats) {
            const newChats = {...chats}
            newChats[chat.id] = chat
            setChats(newChats)
        }
    }

    function onGetMessages(chatId, messages, scrollDownTo) {
        setHasFetchedMessages(true)
        setMessages(_.mapKeys(messages, 'id'))

        if (messages.length > 0) {
            const message = messages[messages.length - 1]

            if (props.userName && props.userName !== message.sender_username) {
                readMessage(conn, chatId, message.id, (chat) => onReadMessage(chat))
            }
        }

        if (scrollDownTo) {
            animateScroll.scrollToBottom({ duration: 0, containerId: scrollDownTo })
        }
        
        props.onGetMessages && props.onGetMessages(chatId, messages)
    }

    function loadMessages(loadMoreMessages) {
        // Message Loader triggers
        if (loadMoreMessages) { 
            count = count + interval
            setLoadMoreMessages(false)

            getLatestMessages(
                conn, activeChat, count, 
                (chatId, messages) => onGetMessages(chatId, messages, false)
            )

        // Active Chat passed by context
        } else if (conn && !props.activeChat && activeChat !== null && activeChat !== currentChat) {
            count = initial
            setCurrentChat(activeChat)

            getLatestMessages(
                conn, activeChat, count, 
                (chatId, messages) => onGetMessages(chatId, messages, "ce-feed-container")
            )

        // Active Chat passed by props
        } else if (conn && props.activeChat && props.activeChat !== currentChat) {
            count = initial
            setActiveChat(props.activeChat)
            setCurrentChat(props.activeChat)

            getLatestMessages(
                conn, props.activeChat, count, 
                (chatId, messages) => onGetMessages(chatId, messages, "ce-feed-container")
            )
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

        } else {
            // Scroll on new incoming messages
            if(isBottomVisible && !_.isEmpty(messages)) {
                animateScroll.scrollToBottom({
                    duration,
                    containerId: "ce-feed-container"
                })
            }
        }
    }, [sendingMessages, messages, isBottomVisible])


    const chat = chats && chats[currentChat] 
    const needsIceBreaker = hasFetchedMessages && _.isEmpty(messages)
    
    if (conn === undefined) {
        return <AuthFail {...props} />
    
    } else if (conn && chats !== null && _.isEmpty(chats)) {
        return <CreateChat />
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

                {
                    Object.keys(messages).length > 0 &&
                    <RenderTrigger onEnter={() => setLoadMoreMessages(true)} />
                }

                { needsIceBreaker && props.renderIceBreaker && props.renderIceBreaker(chat) }

                { needsIceBreaker && !props.renderIceBreaker && <IceBreaker /> }

                <Messages {...props} />

                <SendingMessages {...props} />

                { props.renderIsTyping ? props.renderIsTyping(typers) : <IsTyping /> }

                { props.renderConnectionBar ? props.renderConnectionBar(chat) : <ConnectionBar /> }

                <div style={{ height: '86px' }} className='ce-feed-container-bottom' />
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