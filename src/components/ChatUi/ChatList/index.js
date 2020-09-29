import React, { Component } from 'react'

import _ from 'lodash'

import { daySinceSent } from '../Utilities/dateToString'

import ChatForm from './ChatForm'

class ChatList extends Component {

    renderChats(chats) {
        return _.map(chats, (chat, index) => {
            const extraStyle = (chat && this.props.activeChat === chat.id) ? styles.activeChat : {}
            
            if (!chat) return <div />

            return (
                <div 
                    key={`chat_${index}`} 
                    onClick={() => this.props.onChatClick(chat.id)}
                    style={{ ...styles.chatContainer, ...extraStyle }}
                >
                    
                    <div style={ styles.titleText }>
                        { chat.title }
                    </div>

                    <div style={{ width: '100%' }}>
                        <div style={ styles.messageText }>
                            { chat.last_message.text ? chat.last_message.text : 'Say hello!' }
                        </div>

                        <div style={{ ...styles.messageText, ...{ float: 'right', textAlign: 'right', width: '25%', position: 'relative', bottom: '17px' } }}>
                            { daySinceSent(chat.last_message.created) }
                        </div>
                    </div>

                </div>
            )
        })
    }

    render() {
        return (
            <div style={{ height: '100vh', borderRight: '1px solid #afafaf' }}>

                <div style={ styles.chatsContainer }>

                    { this.renderChats(this.props.chats) } 

                    {
                        this.props.renderNewChatForm ?
                        this.props.renderNewChatForm() :
                        <div style={ styles.newChatContainer }>
                            <ChatForm creds={this.props.creds} />
                        </div>
                    }
                    
                </div>

            </div>
        )
    }
}

const styles={
    chatsContainer: { 
        width: '100%', 
        height: '100%', 
        overflow: 'scroll',
        backgroundColor: 'white', 
        borderRadius: '0px 0px 24px 24px'
    },
    chatContainer: { 
        padding: '16px', 
        cursor: 'pointer'
    },
    titleText: { 
        fontWeight: '500',
         paddingBottom: '4px', 
         whiteSpace: 'nowrap', 
         overflow: 'hidden' 
    },
    messageText: {
        width: '75%',
        color: 'rgba(153, 153, 153, 1)', 
        fontSize: '14px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden'
    },
    activeChat: {
        backgroundColor: '#d9d9d9',
        border: '4px solid white',
        borderRadius: '12px'
    },
    newChatContainer: { 
        position: 'absolute', 
        bottom: '0px', 
        width: '100%', 
        padding: '12px', 
    }
}

export default ChatList;
