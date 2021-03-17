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
                <Socket 
                    development
                    projectID='1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
                    userName='Jane_Smith'
                    userSecret='pass1234'
                    onConnect={(c) => this.setState({ c, loading: false })}
                />

                {
                    this.state.c !== null &&
                    <ChatFeed 
                        conn={this.state.c}    // Should it be c
                        activeChat={296}                // These two should be grouped into Chats
                        // chats={[{id: 296}]}
                    />
                }
            </div>
        )
    }
}
