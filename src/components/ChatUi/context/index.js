import React, { useState, createContext } from 'react'

export const ChatEngineContext = createContext()

export const ChatEngineProvider = props => {
    const [state, setState] = useState({
        connecting: true,
    })

    return (
        <ChatEngineContext.Provider value={[state, setState]}>
            {props.children}
        </ChatEngineContext.Provider>
    )
}