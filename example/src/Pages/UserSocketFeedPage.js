import React, { Component } from 'react'

import { ChatEngineWrapper, Socket, ChatFeed, ChatList } from 'react-chat-engine'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const prod = false // window.location.host.indexOf('chatengine.io') !== -1

const projectID = prod ? '...' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
const chatID = prod ? 0 : 251

export default class HomePage extends Component {
    state = {
        loading: false,
        c: null,
    }
    
    render() { 
        return (
            <Row>
                <Col xs={12} sm={6} md={4} style={{ height: '600px' }}>
                    <ChatEngineWrapper>
                        <Socket 
                            development={!prod}
                            projectID={projectID}
                            userName={'Adam_La_Morre'}
                            userSecret={'pass1234'}
                        />

                        <ChatFeed development={!prod} activeChat={chatID} /> 
                    </ChatEngineWrapper>
                </Col>
            </Row>
        )
    }
}
