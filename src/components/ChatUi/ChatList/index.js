import React, { Component } from 'react'

import _ from 'lodash'

import ChatForm from './ChatForm'

class ChatList extends Component {

    renderChats(chats) {
        return _.map(chats, (chat, index) => {
            const extraStyle = this.props.activeChat === chat.id ? styles.activeChat : {}
            
            if (chat) { // Handle Deleted chats
                return (
                    <div 
                        key={`chat_${index}`} 
                        onClick={() => this.props.onChatClick(chat.id)}
                        style={{ ...styles.chat, ...extraStyle }}
                    >
                        {chat.title}
                    </div>
                )
            }
        })
    }

    render() {
        return (
            <div style={{ height: '100vh', borderRight: '1px solid #afafaf' }}>

                { this.renderChats(this.props.chats) } 

                <div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
                    
                    <ChatForm creds={this.props.creds} />

                </div>

            </div>
        )
    }
}

const styles={
    chat: { 
        padding: '16px', 
        cursor: 'pointer'
    },
    activeChat: {
        backgroundColor: '#d9d9d9',
        border: '4px solid white',
        borderRadius: '12px'
    },
}

export default ChatList;
