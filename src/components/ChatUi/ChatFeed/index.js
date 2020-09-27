import React, { Component } from 'react'

import Title from './TitleSection'
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
            <div style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>

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
        height: 'calc(100% - 72px)', 
        width: '100%', 
        overflow: 'scroll',
        borderRadius: '42px',
        backgroundColor: 'white'
    }
}