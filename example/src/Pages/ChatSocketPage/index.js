import React, { Component } from 'react'

import { ChatEngineWrapper, ChatSocket, ChatFeed, ChatList } from 'react-chat-engine'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const prod = window.location.host.indexOf('chatengine.io') !== -1

const projectID = prod ? '...' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
const chatID = prod ? 0 : 251
const chatAccessKey = prod ? '123' : 'ca-0d21f8cb-b884-4a8b-9e2e-a2acbdbc3792'
const senderUsername = 'Abel Smith'

export default class HomePage extends Component {
    render() { 
        return (
            <ChatEngineWrapper>
                <Row style={{ height: '100vh', backgroundColor: '#bae7ff' }}>
                    <Col xs={0} sm={0} md={4}  />

                    <Col xs={12} sm={6} md={4} style={{ height: '95vh', marginTop: '2.5vh' }}>
                            <ChatSocket 
                                development={!prod}
                                projectID={projectID}
                                chatID={chatID}
                                chatAccessKey={chatAccessKey}
                                senderUsername={senderUsername}
                            />

                            <ChatFeed development={!prod} activeChat={chatID} /> 
                    </Col>

                    <Col xs={12} sm={6} md={4} style={{ height: '95vh', marginTop: '2.5vh' }}>
                        <ChatList development={!prod}/>
                    </Col>
                </Row>
            </ChatEngineWrapper>
        )
    }
}
