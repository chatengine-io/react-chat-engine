import React, { Component } from 'react'

import ChatHeader from './ChatHeader'
import { AuthFail, Loading, Welcome } from './Steps'

import MessageBubble from './MessageBubble'
import NewMessageForm from './NewMessageForm'
import IsTyping from './IsTyping'

import _ from 'lodash'

import { animateScroll } from "react-scroll"

export default class ChatFeed extends Component {
    state = {
        duration: 0
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ duration: 100 })
        }, 3000); // Once the chat loads, start animating
    }

    renderTypers() {
        const { typingData, activeChat } = this.props
        const typers = typingData && typingData[activeChat] ? typingData[activeChat] : []

        if (this.props.renderIsTyping) {
            return this.props.renderIsTyping(typers)
        }

        return typers.map((username, index) => <IsTyping key={`typer_${index}`} username={username} />)
    }

    renderMessages() {
        const { messages, chats, activeChat } = this.props
        const chat = chats && chats[activeChat]
        const keys = Object.keys(messages)

        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

            if (this.props.renderMessageBubble) {
                return (
                    <div key={`message_${index}`}>
                        { 
                            this.props.renderMessageBubble(
                                this.props, 
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
                    {...this.props}
                    chat={chat}
                    message={message}
                    lastMessage={messages[lastMessageKey]}
                    nextMessage={messages[nextMessageKey]}
                />
            )
        })
    }

    renderSendingMessages() {
        const { sendingMessages, chats, activeChat } = this.props
        const keys = Object.keys(sendingMessages)
        const chat = chats && chats[activeChat]

        return keys.map((key, index) => {
            const message = sendingMessages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

            if(message && message.chat === this.props.activeChat) {
                return (
                    <MessageBubble 
                        sending
                        key={`sending-msg-${index}`}
                        {...this.props}
                        chat={chat}
                        message={message}
                        lastMessage={sendingMessages[lastMessageKey]}
                        nextMessage={sendingMessages[nextMessageKey]}
                    />
                )
            }
        })
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            duration: this.state.duration,
            containerId: "ce-feed-container"
        })
    }

    componentDidUpdate() {
        // Only scroll if messages loaded
        // TODO: Make more sophisticated
        if(!_.isEmpty(this.props.messages)) {
            this.scrollToBottom()
        }
    }

    render() {
        const { chats, conn, activeChat } = this.props
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
                {
                    this.props.connecting &&
                    <Loading />
                }

                {
                    this.props.renderChatHeader ? 
                    this.props.renderChatHeader(chat) :
                    <ChatHeader {...this.props} />
                }


                <div
                    id='ce-feed-container'
                    style={styles.feedContainer} 
                    className='ce-chat-feed-container'
                >
                    <div style={{ height: '88px' }} className='ce-feed-container-top' />

                    { this.renderMessages() }

                    { this.renderSendingMessages() }

                    { this.renderTypers() }

                    <div style={{ height: '54px' }} className='ce-feed-container-bottom' />
                </div>

                {
                    this.props.renderNewMessageForm ?
                    this.props.renderNewMessageForm(this.props, activeChat) :
                    <NewMessageForm {...this.props} />
                }
            </div>
        )
    }
}
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