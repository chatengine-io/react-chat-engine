import React, { Component } from 'react'

import Message from './Message'
import MessageForm from './MessageForm'

import _ from 'lodash'

class ChatList extends Component {

    renderMessages(messages) {
        return _.map(messages, (message, index) => {
            return <Message key={`message_${index}`} message={message} creds={this.props.creds} chatId={this.props.chatId} />            
        })
    }

    render() {
        const { messages } = this.props

        return (
            <div style={{ float: 'left', width: '55vw', height: '100vh' }}>

                { this.renderMessages(messages) }

                <MessageForm chatId={this.props.chatId} creds={this.props.creds} />

            </div>
        )
    }
}

export default ChatList;
