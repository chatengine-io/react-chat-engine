import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from '../../Context'

import { getMessages, readMessage } from '../../../actions/messages'

import ChatHeader from './ChatHeader'
import { AuthFail, Loading, Welcome } from './Steps'

import MessageBubble from './MessageBubble'
import NewMessageForm from './NewMessageForm'
import IsTyping from './IsTyping'

import _ from 'lodash'

import { animateScroll } from "react-scroll"

const ChatFeed = props => {
    const didMountRef = useRef(false)
    const [duration, setDuration] = useState(0)
    const [currentChat, setCurrentChat] = useState(null)
    const { 
        connecting, conn,
        chats, setChats,
        sendingMessages,
        messages, setMessages,
        activeChat, setActiveChat,
        typingData, setTypingData, 
        typingCounter, setTypingCounter,
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
            const messageId = messages[messages.length - 1].id
            readMessage(conn, chatId, messageId, (chat) => onReadMessage(chat))
        }
        
        props.onGetMessages && props.onGetMessages(chatId, messages)
    }

    useEffect(() => {
        if (conn && !props.activeChat && activeChat !== null && activeChat !== currentChat) {
            setCurrentChat(activeChat)
            getMessages(conn, activeChat, (chatId, messages) => onGetMessages(chatId, messages))

        } else if (conn && props.activeChat && props.activeChat !== currentChat) {
            setActiveChat(props.activeChat)
            setCurrentChat(props.activeChat)
            getMessages(conn, props.activeChat, (chatId, messages) => onGetMessages(chatId, messages))
        }
    }, [activeChat])

    useEffect(() => { // TODO: Is typing is super shitty
        if (typingCounter) {
            const newTypingCounter = {...typingCounter}
            Object.keys(newTypingCounter).map(chatId => {
                Object.keys(newTypingCounter[chatId]).map(person => {
                    if (newTypingCounter[chatId][person] > 0) {
                        setTimeout(() => {
                            setTypingCounter({
                                ...newTypingCounter,
                                [chatId]: {
                                    ...newTypingCounter[chatId],
                                    [person]: newTypingCounter[chatId][person] - 1
                                }
                            })
                        }, 2500)
                    }
                })
            })
        }
    }, [typingCounter])

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setTimeout(() => { // Once chat loads, animate scroll
                setDuration(100)
            }, 3000);

        } else {
            if(!_.isEmpty(messages)) { // Scroll (TODO: Make more sophisticated)
                animateScroll.scrollToBottom({
                    duration,
                    containerId: "ce-feed-container"
                })
            }

            Object.keys(typingCounter).map((chat) => { // Render Typing Data
                let typers = []
        
                Object.keys(typingCounter[chat]).map((person) => {
                    if (typingCounter[chat][person] > 0) {
                        typers.push(person)
                    }
                })
        
                if (!typingData[chat] || typingData[chat].length !== typers.length) {
                    setTypingData({ ...typingData, [chat]: typers })
                }
            })
        }
    })

    function renderTypers() {
        const typers = typingData && typingData[activeChat] ? typingData[activeChat] : []

        if (props.renderIsTyping) {
            return props.renderIsTyping(typers)
        }

        return typers.map((username, index) => <IsTyping key={`typer_${index}`} username={username} />)
    }

    function renderMessages() {
        const chat = chats && chats[activeChat]
        const keys = Object.keys(messages)
        
        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

            if (props.renderMessageBubble) {
                return (
                    <div key={`message_${index}`}>
                        { 
                            props.renderMessageBubble(
                                conn, 
                                chat, 
                                messages[lastMessageKey], 
                                message, 
                                messages[nextMessageKey]
                            ) 
                        }
                    </div>
                )
            }
            
            return (
                <MessageBubble 
                    key={`message_${index}`}
                    chat={chat}
                    message={message}
                    lastMessage={messages[lastMessageKey]}
                    nextMessage={messages[nextMessageKey]}
                />
            )
        })
    }

    function renderSendingMessages() {
        const keys = Object.keys(sendingMessages)
        const chat = chats && chats[activeChat]

        return keys.map((key, index) => {
            const message = sendingMessages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

            if(message && message.chat === activeChat) {
                return (
                    <MessageBubble 
                        sending
                        key={`sending-msg-${index}`}
                        chat={chat}
                        message={message}
                        lastMessage={sendingMessages[lastMessageKey]}
                        nextMessage={sendingMessages[nextMessageKey]}
                    />
                )
            }
        })
    }

    const chat = chats && chats[currentChat] 

    if(conn === undefined) { return <AuthFail /> }

    if(conn && chats !== null && _.isEmpty(chats)) { return <Welcome /> }

    return (
        <div 
            className='ce-chat-feed'
            style={{ display: 'flex', maxHeight: '100vh', backgroundColor: '#f0f0f0' }}
        >
            { connecting && <Loading /> }

            {
                props.renderChatHeader ? 
                props.renderChatHeader(chat) :
                <ChatHeader />
            }

            <div
                id='ce-feed-container'
                style={styles.feedContainer} 
                className='ce-chat-feed-container'
            >
                <div style={{ height: '88px' }} className='ce-feed-container-top' />

                { renderMessages() }

                { renderSendingMessages() }

                { renderTypers() }

                <div style={{ height: '54px' }} className='ce-feed-container-bottom' />
            </div>

            {
                props.renderNewMessageForm ?
                props.renderNewMessageForm(props, currentChat) :
                <NewMessageForm />
            }
        </div>
    )
}

export default ChatFeed

const styles = {
    feedContainer: { 
        position: 'absolute', 
        top: '0px', 
        height: '100%', 
        width: '100%', 
        overflow: 'scroll',
        overflowX: 'hidden',
        backgroundColor: 'white',
        borderRight: '1px solid rgb(175, 175, 175)'
    }
}