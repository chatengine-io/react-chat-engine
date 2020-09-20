import React from 'react'

import Socket from './Socket'
import ChatUi from './ChatUi'

const SocketConnector = (props) => {
    if (props.hideExample) {
        return <Socket {...props} />
    } else {
        return <ChatUi {...props} />
    }
    
}

export default SocketConnector
