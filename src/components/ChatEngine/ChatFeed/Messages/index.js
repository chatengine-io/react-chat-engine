import React, { useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import MessageBubble from './MessageBubbles/index'

const Messages = props => {
    const { 
        conn,
        chats,
        messages,
        activeChat,
    } = useContext(ChatEngineContext)

    const chat = chats && chats[activeChat]
    const keys = Object.keys(messages)

    if (!conn || conn === null) return <div />
    
    return keys.map((key, index) => {
        const message = messages[key]
        const lastMessageKey = index === 0 ? null : keys[index - 1]
        const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

        if (props.renderMessageBubble) {
            return (
                <div key={`message_${index}`}>
                    { 
                        props.renderMessageBubble(
                            conn, 
                            chat, 
                            messages[lastMessageKey], 
                            message, 
                            messages[nextMessageKey]
                        ) 
                    }
                </div>
            )
        }
        
        return (
            <MessageBubble 
                key={`message_${index}`}
                chat={chat}
                message={message}
                lastMessage={messages[lastMessageKey]}
                nextMessage={messages[nextMessageKey]}
            />
        )
    })
}
export default Messages