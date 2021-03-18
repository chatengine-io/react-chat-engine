import React, { useState, createContext } from 'react'

export const ChatEngineContext = createContext()

export const ChatEngineProvider = props => {
    const [state, setState] = useState({
        connecting: true,
        conn: null,
        chats: null,
        messages: {},
        sendingMessages: {},
        activeChat: null,
        typingCounter: {},
        typingData: {},
        // onChatClick: (chatId) => this.setActiveChat(chatId),
        // sendingMessage: (chatId) => this.sendingMessage(chatId),
    })

    return (
        <ChatEngineContext.Provider value={[state, setState]}>
            {props.children}
        </ChatEngineContext.Provider>

    )
}