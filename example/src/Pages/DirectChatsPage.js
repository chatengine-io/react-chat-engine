import React, { Component } from 'react'

import { ChatEngine, newChat, addPerson } from 'react-chat-engine'

const props = {
    // development: true,
    userName: 'Adam_La_Morre',
    userSecret: 'pass1234',
    projectID: '1ed59673-1fd6-46ed-9eb9-56239a6a4f82',
}

export default class DirectChatPage extends Component {    
    state = {
        username: ''
    }

    createDirectChat() {
        newChat(
            props,
            {is_direct_chat: true},
            (chat) => addPerson(props, chat.id, this.state.username)
        )
    }

    renderChatForm(creds) {
        return (
            <div>
                <input placeholder='Username' value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                <button onClick={() => this.createDirectChat()}>Chat</button>
            </div>
        )
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
                <ChatEngine 
                    height='100vh'
                    {...props}
                    renderNewChatForm={(creds) => this.renderChatForm(creds)}
                />
            </div>
        )
    }
}