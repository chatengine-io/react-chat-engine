import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { 
    ChatEngine, 
    ChatEngineContext,
    ChatList,
    ChatCard,
    NewChatForm
} from 'react-chat-engine'

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
            {...props.accounts} 
            height={props.height} 
            projectID={props.projectID} 
            development={props.development} 
            renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
            renderChatCard={(chat, index) => <ChatCard key={`card_${index}`} chat={chat} />}
            // renderNewChatForm={() => <NewChatForm />}
        />
    )
}

function mapStateToProps(state){
    return { accounts: state.accounts }
}

export default connect(mapStateToProps, {})(ChatEngineApp)
