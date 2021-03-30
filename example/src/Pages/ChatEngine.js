import React, { useContext, useState, useEffect } from 'react'

import { ChatEngine, ChatEngineContext } from 'react-chat-engine'

const ChatEngineApp = props => {
    const { chats, setActiveChat } = useContext(ChatEngineContext)
    const [hasSetLink, setLink] = useState(false)

    useEffect(() => {
        const { id } = props
        if (id && chats && chats[id] && !hasSetLink) {
            setActiveChat(id)
            setLink(true)
        }
    }, [chats])

    return (
        <ChatEngine 
            height='100vh'
            development={!props.prod}
            userName={props.userName}
            userSecret={props.userSecret}
            projectID={props.projectID}
        />
    )
}

export default ChatEngineApp