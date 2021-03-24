import React from 'react'

import Socket from './Socket'
import ChatUi from './ChatUi'

import { ChatEngineProvider } from './ChatUi/context'

const ChatEngine = (props) => {
    if (props.hideUI) {
        return <Socket {...props} />
    } else {
        return <ChatEngineProvider><ChatUi {...props} /></ChatEngineProvider>
    }
    
}

export default ChatEngine
