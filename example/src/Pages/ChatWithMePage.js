import React, { Component } from 'react'

import { ChatEngineProvider, ChatSocket, ChatFeed } from 'react-chat-engine'

const prod = false // window.location.host.indexOf('chatengine.io') !== -1

const projectID = prod ? '...' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
const chatID = prod ? 0 : 251
const chatAccessKey = prod ? '123' : 'ca-0d21f8cb-b884-4a8b-9e2e-a2acbdbc3792'
const senderUsername = 'Adam La Morre'

export default class HomePage extends Component {
    state = {
        loading: false,
        c: null,
    }
    
    render() { 
        return (
            <div>
                <ChatEngineProvider>
                    <ChatSocket 
                        development={!prod}
                        projectID={projectID}
                        chatID={chatID}
                        chatAccessKey={chatAccessKey}
                        senderUsername={senderUsername}
                    />

                    <div style={{ width: '33%', height: '550px' }}>
                        <ChatFeed 
                            development={!prod}
                            projectID={projectID}
                            chatID={chatID}
                            chatAccessKey={chatAccessKey}
                            activeChat={chatID}
                            senderUsername={senderUsername}
                        />
                    </div>
                </ChatEngineProvider>
            </div>
        )
    }
}
