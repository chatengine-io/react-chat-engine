import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import _ from 'lodash'

import Loading from './Loading'

import { daySinceSent } from '../../Utilities/dateToString'

const { htmlToText } = require('html-to-text')

const ChatCard = props => {
    const { chat } = props
    const { conn, activeChat, setActiveChat } = useContext(ChatEngineContext)
    
    if (_.isEmpty(chat) || props.loading) return <Loading />

    if (!conn || conn === null) return <div/>

    function readLastMessage(chat) {
        let readLastMessage = true
        chat.people.map(chat_person => {
            if(conn.userName === chat_person.person.username) {
                readLastMessage = chat.last_message.id === chat_person.last_read
            }
        })
        return readLastMessage
    }

    const extraStyle = activeChat === chat.id ? styles.activeChat : {}
    const otherPerson = chat.people.find(person => person.person.username !== conn.userName);
    const title = chat.is_direct_chat && otherPerson ? otherPerson.person.username : chat.title
    
    let lastMessage = htmlToText(chat.last_message.text, {})
    if (!lastMessage) {
        lastMessage = chat.last_message.attachments.length > 0 ?
        `${chat.last_message.attachments.length} image${chat.last_message.attachments.length > 1 ? 's' : ''}` :
        'Say hello!'
    }

    return (
        <div 
            onClick={() => setActiveChat(chat.id)}
            style={{ ...styles.chatContainer, ...extraStyle }}
            className={`ce-chat-card ${activeChat === chat.id && 'ce-active-chat-card'}`}
        >
            <div 
                style={ styles.titleText }
                className='ce-chat-title-text'
                id={`ce-chat-card-title-${title}`}
            >
                <div 
                    style={{ 
                        width: !readLastMessage(chat) && 'calc(100% - 18px)', 
                        overflowX: 'hidden', 
                        display: 'inline-block' 
                    }}
                >
                    { title }
                </div>
                
                {
                    !readLastMessage(chat) &&
                    <div 
                        className='ce-chat-unread-dot'
                        style={{ 
                            marginTop: '5px',
                            width: '12px',
                            height: '12px',
                            borderRadius: '6px',
                            backgroundColor: '#1890ff',
                            float: 'right', 
                            display: 'inline-block'
                        }} 
                    />
                }
            </div>

            <div style={{ width: '100%' }} className='ce-chat-subtitle'>
                <div style={styles.messageText} className='ce-chat-subtitle-text ce-chat-subtitle-message'>
                    { lastMessage }
                </div>

                <div 
                    className='ce-chat-subtitle-text ce-chat-subtitle-date'
                    style={{ ...styles.messageText, ...{ textAlign: 'right', width: '25%' } }}
                >
                    { daySinceSent(chat.last_message.created) }
                </div>
            </div>
        </div>
    )
}

const styles={
    chatContainer: { 
        padding: '16px', 
        paddingBottom: '12px',
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
        overflow: 'hidden',
        display: 'inline-block'
    },
    activeChat: {
        backgroundColor: '#d9d9d9',
        border: '4px solid white',
        borderRadius: '12px'
    },
}

export default ChatCard;
