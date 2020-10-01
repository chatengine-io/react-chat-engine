import React, { Component } from 'react'

import Title from './TitleSection'
import { Loading, AuthFail, Welcome } from './Steps'

import Message from './Message'
import MessageForm from './MessageForm'

import _ from 'lodash'

export default class ChatList extends Component {

    renderMessages(messages) {
        const keys = Object.keys(messages)

        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index == 0 ? null : keys[index - 1]
            const nextMessageKey = index == keys.length - 1 ? null : keys[index + 1]
            
            return (
                <Message 
                    key={`message_${index}`} 
                    creds={this.props.creds} 
                    chatId={this.props.chatId} 
                    lastMessage={messages[lastMessageKey]}
                    message={message} 
                    nextMessage={messages[nextMessageKey]}
                />
            )
        })

        // return _.map(messages, (message, id) => {
        //     const lastMessage = i == 0 ? null : messages[i - 1]
        //     const nextMessage = i == messages.length - 1 ? null : messages[i + 1]
        //     console.log(lastMessage)
        //     console.log(nextMessage)

        //     i = i + 1

        //     return <Message key={`message_${id}`} message={message} creds={this.props.creds} chatId={this.props.chatId} />            
        // })
    }

    render() {
        const { messages, chats, creds, chatId } = this.props
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

                <Title chat={chat} />

                <div style={ styles.feedContainer }>

                    <div style={{ height: '92px' }} />

                    { this.renderMessages(messages) }

                </div>

                <MessageForm chatId={chatId} creds={creds} />

            </div>
        )
    }
}
const styles = {
    feedContainer: { 
        position: 'absolute', 
        top: '0px', 
        height: 'calc(100% - 64px)', 
        width: '100%', 
        overflow: 'scroll',
        borderRadius: '0px 0px 24px 24px',
        backgroundColor: 'white'
    }
}