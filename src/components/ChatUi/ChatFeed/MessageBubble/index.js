import React, { Component } from 'react'

import DatePartition from './DatePartition'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'
import SendingMessage from './SendingMessage'

export default class Message extends Component {
    state = {
        selected: false
    }

    render() {
        const { lastMessage, message, sending, nextMessage } = this.props
        const { chats, activeChat } = this.props

        if (!message || !chats || !activeChat || !chats[activeChat]) { return <div /> }

        const chat = chats[activeChat]

        return (
            <div className='ce-message-and-date'>
                {
                    !sending &&
                    <DatePartition 
                        lastCreated={lastMessage ? lastMessage.created : null} 
                        created={message.created} 
                    />
                }

                {
                    sending ? 
                    <SendingMessage 
                        chat={chat} 
                        creds={this.props} 
                        lastMessage={lastMessage} 
                        message={message} 
                        nextMessage={nextMessage} 
                    /> :
                    <div>
                        {
                            !sending && message.sender_username === this.props.userName ?
                            <MyMessage 
                                chat={chat} 
                                creds={this.props} 
                                lastMessage={lastMessage} 
                                message={message} 
                                nextMessage={nextMessage} 
                            /> :
                            <TheirMessage 
                                chat={chat} 
                                creds={this.props} 
                                lastMessage={lastMessage} 
                                message={message} 
                                nextMessage={nextMessage} 
                            />
                        }
                    </div>
                }
            </div>
        ) 
    }
}
