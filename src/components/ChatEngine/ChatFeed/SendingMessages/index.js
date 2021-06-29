import React, { useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import MessageBubble from '../Messages/Bubble/index'

const SendingMessages = props => {
    const { 
        conn,
        chats,
        activeChat,
        sendingMessages,
    } = useContext(ChatEngineContext)
    
    const keys = Object.keys(sendingMessages)
    const chat = chats && chats[activeChat]

    if (!conn || conn === null) return <div />

    return keys.map((key, index) => {
        const message = sendingMessages[key]
        const lastMessageKey = index === 0 ? null : keys[index - 1]
        const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

        if(message && message.chat === activeChat) {
            return <div key={`sending-msg-${index}`}>
                {
                    props.renderSendingMessages ?
                    props.renderSendingMessages(
                        conn, 
                        chat, 
                        sendingMessages[lastMessageKey], 
                        message, 
                        sendingMessages[nextMessageKey]
                    ) :
                    <MessageBubble 
                        sending
                        chat={chat}
                        message={message}
                        lastMessage={sendingMessages[lastMessageKey]}
                        nextMessage={sendingMessages[nextMessageKey]}
                    />
                }
            </div>
        }
    })
}
export default SendingMessages