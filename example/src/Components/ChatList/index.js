import React, { Component } from 'react'

import _ from 'lodash'

import ChatForm from './ChatForm'

class ChatList extends Component {

    renderChats(chats) {
        return _.map(chats, (chat, index) => {
            if (chat) { // Handle Deleted chats
                return (
                    <div 
                        key={`chat_${index}`} 
                        onClick={() => this.props.onChatClick(chat.id)}
                        style={{ padding: '12px', borderBottom: '1px solid #afafaf', cursor: 'pointer' }}>
                        {chat.title}
                    </div>
                )
            }
        })
    }

    render() {
        return (
            <div style={{ float: 'left', width: '20vw', height: '100vh', borderRight: '1px solid #afafaf' }}>
                { this.renderChats(this.props.chats) } 

                <ChatForm creds={this.props.creds} />
            </div>
        )
    }
}

export default ChatList;
