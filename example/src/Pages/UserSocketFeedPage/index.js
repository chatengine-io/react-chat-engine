import React from 'react'

import { ChatEngineWrapper, Socket, ChatFeed } from 'react-chat-engine'

import { DEVELOPMENT, PROJECT_ID, USER_NAME, USER_SECRET, CHAT_ID } from '../../consts'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';

setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const UserSocketPage = () => {
    return (
        <Row>
            <Col xs={12} sm={6} md={4} style={{ height: '600px' }}>
                <ChatEngineWrapper>
                    <Socket
                        development={DEVELOPMENT}
                        projectID={PROJECT_ID}
                        userName={USER_NAME}
                        userSecret={USER_SECRET}
                    />

                    <ChatFeed development={DEVELOPMENT} activeChat={CHAT_ID} />
                </ChatEngineWrapper>
            </Col>
        </Row>
    )
}

export default UserSocketPage
