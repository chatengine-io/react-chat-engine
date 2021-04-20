import React, { useContext, useState, useEffect } from 'react'

import _ from 'lodash'

import { ChatEngine, ChatEngineContext } from 'react-chat-engine'

const ChatEngineApp = props => {
    const { chats, messages, setActiveChat } = useContext(ChatEngineContext)
    const [hasSetLink, setLink] = useState(false)

    useEffect(() => {
        const { id } = props
        if (id && chats && chats[id] && !_.isEmpty(messages) && !hasSetLink) {
            setActiveChat(id)
            setLink(true)
        }
    }, [chats, messages, props, setActiveChat, hasSetLink, setLink])

    return (
        <ChatEngine 
            {...props}
            height='100vh'
        />
    )
}

export default ChatEngineApp