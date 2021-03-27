import React from 'react'

import Socket from './Socket'
import ChatEngine from './ChatEngine'

import { ChatEngineProvider } from './ChatEngine/context'

const ChatEngineApp = (props) => {
    if (props.hideUI) {
        return <Socket {...props} />
    } else {
        return <ChatEngineProvider><ChatEngine {...props} /></ChatEngineProvider>
    }
    
}

export default ChatEngineApp
