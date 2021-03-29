import React from 'react'

import Socket from './Socket'
import ChatEngine from './ChatEngine'

import { ChatEngineWrapper } from './Context'

const ChatEngineApp = (props) => {
    if (props.hideUI) {
        return <Socket {...props} />
    } else {
        return <ChatEngineWrapper><ChatEngine {...props} /></ChatEngineWrapper>
    }
    
}

export default ChatEngineApp
