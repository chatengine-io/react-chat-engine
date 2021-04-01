import React, { Component } from 'react'

import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'
import MessageForm from './MessageForm'

export default class ChatFeed extends Component {
    renderReadReceipts(message, isMyMessage) {
        const chat = this.props.chats && this.props.chats[this.props.activeChat]

        return chat.people.map((person, index) => {
            return person.last_read === message.id &&
            <div 
                key={`read_${index}`}
                className='read-receipt'
                style={{ 
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
                }}
            />
        })
    }

    renderMessages(messages) {
        const keys = Object.keys(messages)

        return keys.map((key, index) => {
            const message = messages[key]
            const lastMessageKey = index === 0 ? null : keys[index - 1]
            const isMyMessage = this.props.userName === message.sender.username

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className='message-block'>
                        {
                            isMyMessage ?
                            <MyMessage message={message} /> :
                            <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    
                    <div
                        className='read-receipts'
                        style={{ 
                            marginRight: isMyMessage ? '18px' : '0px',
                            marginLeft: isMyMessage ? '0px' : '68px',
                        }}
                    >
                        { this.renderReadReceipts(message, isMyMessage) }
                    </div>
                </div>
            )
        })
    }

    render() {
        const chat = this.props.chats && this.props.chats[this.props.activeChat]

        if (!chat) return <div />

        return (
            <div className='chat-feed'>
                <div className='chat-title-container'>
                    <div className='chat-title'>{ chat.title }</div>

                    <div className='chat-subtitle'>
                        { chat.people.map(person => ' ' + person.person.username) }
                    </div>
                </div>

                { this.renderMessages(this.props.messages) }

                <div style={{ height: '100px' }} />

                <div className='message-form-container'>
                    <MessageForm {...this.props} chatId={this.props.activeChat} />
                </div>
            </div>
        );
    }
}