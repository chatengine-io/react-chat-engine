import React, { Component } from 'react'

import { Socket, ChatFeed } from 'react-chat-engine'

// const prod = window.location.host.indexOf('chatengine.io') !== -1

export default class HomePage extends Component {
    state = {
        loading: false,
        c: null,
    }
    
    render() { 
        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
                hello!
            </div>
        )
    }
}
