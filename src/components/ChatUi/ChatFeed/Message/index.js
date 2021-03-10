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
        const { creds, chat, lastMessage, message, sending, nextMessage } = this.props

        if (!message) { return <div /> }

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
                        creds={creds} 
                        lastMessage={lastMessage} 
                        message={message} 
                        nextMessage={nextMessage} 
                    /> :
                    <div>
                        {
                            !sending && message.sender_username === creds.userName ?
                            <MyMessage 
                                chat={chat} 
                                creds={creds} 
                                lastMessage={lastMessage} 
                                message={message} 
                                nextMessage={nextMessage} 
                            /> :
                            <TheirMessage 
                                chat={chat} 
                                creds={creds} 
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
