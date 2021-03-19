import React, { useState, useEffect, useRef } from 'react'

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

    useEffect(() => {
        if (!didMountRef.current) {
            setTimeout(() => {
                setDuration(100)
            }, 3000); // Once the chat loads, start animating
            
            didMountRef.current = true

        } else {
            // Only scroll if messages loaded
            // TODO: Make more sophisticated
            if(!_.isEmpty(props.messages)) {
                animateScroll.scrollToBottom({
                    duration,
                    containerId: "ce-feed-container"
                })
            }
        }
    })

    function renderTypers() {
        const { typingData, activeChat } = props
        const typers = typingData && typingData[activeChat] ? typingData[activeChat] : []

        if (props.renderIsTyping) {
            return props.renderIsTyping(typers)
        }

        return typers.map((username, index) => <IsTyping key={`typer_${index}`} username={username} />)
    }

    function renderMessages() {
        const { messages, chats, activeChat } = props
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
                                props, 
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
                    {...props}
                    chat={chat}
                    message={message}
                    lastMessage={messages[lastMessageKey]}
                    nextMessage={messages[nextMessageKey]}
                />
            )
        })
    }

    function renderSendingMessages() {
        const { sendingMessages, chats, activeChat } = props
        const keys = Object.keys(sendingMessages)
        const chat = chats && chats[activeChat]

        return keys.map((key, index) => {
            const message = sendingMessages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

            if(message && message.chat === props.activeChat) {
                return (
                    <MessageBubble 
                        sending
                        key={`sending-msg-${index}`}
                        {...props}
                        chat={chat}
                        message={message}
                        lastMessage={sendingMessages[lastMessageKey]}
                        nextMessage={sendingMessages[nextMessageKey]}
                    />
                )
            }
        })
    }

    const { chats, conn, activeChat } = props
    const chat = chats && chats[activeChat] 

    if(conn === undefined) {
        return <AuthFail />
    }

    if(conn && chats !== null && _.isEmpty(chats)) {
        return <Welcome />
    }

    return (
        <div 
            className='ce-chat-feed'
            style={{ display: 'flex', maxHeight: '100vh', backgroundColor: '#f0f0f0' }}
        >
            { props.connecting && <Loading /> }

            {
                props.renderChatHeader ? 
                props.renderChatHeader(chat) :
                <ChatHeader {...props} />
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
                props.renderNewMessageForm(props, activeChat) :
                <NewMessageForm {...props} />
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