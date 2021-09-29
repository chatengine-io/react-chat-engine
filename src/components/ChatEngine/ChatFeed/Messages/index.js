import React, { useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import { RenderTrigger } from '../Triggers'

import MessageBubble from './Bubble/index'

const Messages = props => {
    const {
        conn,
        chats,
        messages,
        activeChat,
        setIsBottomVisible,
    } = useContext(ChatEngineContext)

    const chat = chats && chats[activeChat]
    const keys = Object.keys(messages)

    if (!conn || conn === null || !chat) return <div />

    return keys.map((key, index) => {
        const message = messages[key]
        const lastMessageKey = index === 0 ? null : keys[index - 1]
        const nextMessageKey = index === keys.length - 1 ? null : keys[index + 1]

        if (props.renderMessageBubble) {
            return (
                <div key={`message_${index}`}>
                    {/* Scroll down if the top of last msg is visible */}
                    {
                        index === keys.length - 1 &&
                        <RenderTrigger
                            id='ce-first-message-render-trigger'
                            onEnter={() => setIsBottomVisible(true)}
                            onLeave={() => setIsBottomVisible(false)}
                        />
                    }

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
            <div key={`message_${index}`} id={`ce-message-${message.id}`}>
                {/* Scroll down if the top of last msg is visible */}
                {
                    index === keys.length - 1 &&
                    <RenderTrigger
                        id='ce-last-message-render-trigger'
                        onEnter={() => setIsBottomVisible(true)}
                        onLeave={() => setIsBottomVisible(false)}
                    />
                }

                <MessageBubble
                    chat={chat}
                    message={message}
                    lastMessage={messages[lastMessageKey]}
                    nextMessage={messages[nextMessageKey]}
                />
            </div>
        )
    })
}
export default Messages