import React, { Component } from 'react'

import Title from './TitleSection'
import { Loading, AuthFail, Welcome } from './Steps'

import Message from './Message'
import MessageForm from './MessageForm'

import _ from 'lodash'

import { animateScroll } from "react-scroll"

import { stringToColor } from '../Utilities/colorMapping'

export default class ChatList extends Component {
    state = {
        duration: 0
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ duration: 100 })
        }, 3000); // Once the chat loads, start animating
    }

    renderTypers() {
        const { typingData, chatId } = this.props
        const typers = typingData[chatId] ? typingData[chatId] : []

        if (this.props.renderIsTyping) {
            return this.props.renderIsTyping(typers)
        }

        return typers.map((typer, index) => {
            return (
                <div 
                    key={`typer_${index}`} 
                    style={{ color: stringToColor(typer), padding: '2px', paddingLeft: '12px' }}
                >
                    {`${typer} is typing...`}
                </div>
            )
        })
    }

    renderMessages() {
        const { messages, chats, creds, chatId } = this.props
        const chat = chats && chats[chatId]
        const keys = Object.keys(messages)

        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index == 0 ? null : keys[index - 1]
            const nextMessageKey = index == keys.length - 1 ? null : keys[index + 1]

            if (this.props.renderMessageBubble) {
                return (
                    <div key={`message_${index}`}>
                        { this.props.renderMessageBubble(creds, chat, messages[lastMessageKey], message, messages[nextMessageKey]) }
                    </div>
                )
            }
            
            return (
                <Message 
                    key={`message_${index}`} 
                    chat={chat} 
                    creds={creds} 
                    message={message} 
                    lastMessage={messages[lastMessageKey]}
                    nextMessage={messages[nextMessageKey]}
                />
            )
        })
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            duration: this.state.duration,
            containerId: "feed-container"
        })
    }

    componentDidUpdate(){
        this.scrollToBottom()
    }

    render() {
        const { chats, creds, chatId } = this.props
        const chat = chats && chats[chatId] 

        if(creds === null) { 
            return <Loading />
        }

        if(creds === undefined) {
            return <AuthFail />
        }

        if(creds && chats !== null && _.isEmpty(chats)) {
            return <Welcome />
        }

        return (
            <div style={{ display: 'flex', maxHeight: '100vh', backgroundColor: '#f0f0f0' }}>

                {
                    this.props.renderChatHeader ? 
                    this.props.renderChatHeader(chat) :
                    <Title chat={chat} />
                }


                <div style={ styles.feedContainer } id='feed-container'>

                    <div style={{ height: '88px' }} />

                    { this.renderMessages() }

                    { this.renderTypers() }

                    <div id='feet-bottom' style={{ height: '54px' }} />

                </div>

                {
                    this.props.renderNewMessageForm ?
                    this.props.renderNewMessageForm(creds, chatId) :
                    <MessageForm chatId={chatId} creds={creds} />
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
        backgroundColor: 'white'
    }
}