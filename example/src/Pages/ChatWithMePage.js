import React, { Component } from 'react'

// import { ChatEngine } from 'react-chat-engine'

const prod = window.location.host.indexOf('chatengine.io') !== -1

export default class HomePage extends Component {
    state = {
        loading: false,
        rootUrl: prod ? 'https://api.chatengine.io/' : 'http://127.0.0.1:8000/',
        projectID: prod ? '8a1f9edb-a05a-4b55-9d6e-ec399a38f5a9' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82',
        userName: '',
        userSecret: '',
    }
    
    render() {  
        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
                Chat wimme nah
            </div>
        )
    }
}
