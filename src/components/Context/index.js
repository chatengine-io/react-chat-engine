import React, { useState, createContext } from 'react'

export const ChatEngineContext = createContext()

export const ChatEngineWrapper = props => {
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
