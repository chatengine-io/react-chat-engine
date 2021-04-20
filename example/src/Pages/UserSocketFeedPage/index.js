import React from 'react'

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const prod = window.location.host.indexOf('chatengine.io') !== -1

const projectID = prod ? '...' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
const chatID = prod ? 0 : 251

const UserSocketPage = () => {
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

export default UserSocketPage
