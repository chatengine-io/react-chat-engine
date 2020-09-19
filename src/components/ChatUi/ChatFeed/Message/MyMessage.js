import React, { Component } from 'react'

import MessageEditForm from '../MessageForm/edit'

import { deleteMessage } from 'react-chat-engine'

export default class Message extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, message, chatId } = this.props

        if (!message) { return <div /> }

        return (
            <div 
                style={styles.myMessage}
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >

                { message.text }

                {
                    this.state.selected &&
                    <div>

                        <MessageEditForm creds={creds} chatId={chatId} message={message} />

                        <button onClick={() => deleteMessage(creds, chatId, message.id)}>Delete</button>

                    </div>
                }

            </div>
        )
    }
}

const styles = {
    myMessage: {
        color: '#2f54eb', 
        width: '100%', 
        cursor: 'pointer'
    }
}