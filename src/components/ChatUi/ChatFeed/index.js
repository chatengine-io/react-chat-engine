import React, { Component } from 'react'

import { Loading, AuthFail, Welcome } from './Steps'

import Message from './Message'
import MessageForm from './MessageForm'

import _ from 'lodash'

export default class ChatList extends Component {

    renderMessages(messages) {
        return _.map(messages, (message, index) => {
            return <Message key={`message_${index}`} message={message} creds={this.props.creds} chatId={this.props.chatId} />            
        })
    }

    render() {
        const { messages, chats, creds } = this.props

        console.log(chats, chats === {})

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
            <div style={{ height: '100vh' }}>

                { this.renderMessages(messages) }

                <MessageForm chatId={this.props.chatId} creds={this.props.creds} />

            </div>
        )
    }
}
