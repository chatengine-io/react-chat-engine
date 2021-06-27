import React, { useContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import { 
    ChatEngine, 
    ChatEngineContext,
    ChatList,
    ChatCard,
    NewChatForm,
    ChatFeed,
    ChatHeader,
    IceBreaker,
    MessageBubble,
    // IsTyping
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
            // You want the extra args for outside components
            renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
            renderChatCard={(chat, index) => <ChatCard key={`card_${index}`} chat={chat} />}
            renderNewChatForm={(creds) => <NewChatForm creds={creds} />} 
            renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
            renderChatHeader={(chat) => <ChatHeader />}
            renderIceBreaker={(chat) => <IceBreaker />}
            renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
            // renderIsTyping={(typers) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
        />
    )
}

function mapStateToProps(state){
    return { accounts: state.accounts }
}

export default connect(mapStateToProps, {})(ChatEngineApp)
