import React, { useState, createContext } from 'react'

export const ChatEngineContext = createContext()

export const ChatEngineProvider = props => {
    // const [context, setContext] = useState({
        // onChatClick: (chatId) => this.setActiveChat(chatId), // begging for correct context implementation
        // sendingMessage: (chatId) => this.sendingMessage(chatId),
    // })

    const [connecting, setConnecting] = useState(true)
    const [conn, setConn] = useState(null)
    const [chats, setChats] = useState(null)
    const [messages, setMessages] = useState({})
    const [sendingMessages, setSendingMessages] = useState({})
    const [activeChat, setActiveChat] = useState(null)
    const [typingCounter, setTypingCounter] = useState({})
    const [typingData, setTypingData] = useState({})

    const value = {
        connecting, setConnecting,
        conn, setConn,
        chats, setChats,
        messages, setMessages,
        sendingMessages, setSendingMessages,
        activeChat, setActiveChat,
        typingCounter, setTypingCounter,
        typingData, setTypingData,
    }

    return (
        <ChatEngineContext.Provider value={value}>
            {props.children}
        </ChatEngineContext.Provider>
    )
}
