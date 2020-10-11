import React, { Component } from 'react'

import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

export default class Message extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, chat, lastMessage, message, nextMessage } = this.props

        if (!message) { return <div /> }

        if(message.sender == creds.userName) {
            return (
                <MyMessage 
                    chat={chat} 
                    creds={creds} 
                    lastMessage={lastMessage} 
                    message={message} 
                    nextMessage={nextMessage} 
                />
            )
            
        } else {
            return (
                <TheirMessage 
                    chat={chat} 
                    creds={creds} 
                    lastMessage={lastMessage} 
                    message={message} 
                    nextMessage={nextMessage} 
                />
            )
        }   
    }
}
