import React from 'react'

import { ChatEngineWrapper, ChatSocket, ChatFeed, ChatList } from 'react-chat-engine'

import { DEVELOPMENT, PROJECT_ID, CHAT_ID, CHAT_ACCESS_KEY } from '../../consts'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const HomePage = () => {
    const senderUsername = 'Abel Smith'

    return (
        <ChatEngineWrapper>
            <Row style={{ height: '100vh', backgroundColor: '#bae7ff' }}>
                <Col xs={0} sm={0} md={4}  />

                <Col xs={12} sm={6} md={4} style={{ height: '95vh', marginTop: '2.5vh' }}>
                        <ChatSocket 
                            development={DEVELOPMENT}
                            projectID={PROJECT_ID}
                            chatID={CHAT_ID}
                            chatAccessKey={CHAT_ACCESS_KEY}
                            senderUsername={senderUsername}
                        />

                        <ChatFeed development={DEVELOPMENT} activeChat={CHAT_ID} /> 
                </Col>

                <Col xs={12} sm={6} md={4} style={{ height: '95vh', marginTop: '2.5vh' }}>
                    <ChatList development={DEVELOPMENT}/>
                </Col>
            </Row>
        </ChatEngineWrapper>
    )
}

export default HomePage
