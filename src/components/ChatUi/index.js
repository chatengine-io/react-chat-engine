import React, { useContext } from 'react'

import { ChatEngineContext } from './context'

import _ from 'lodash'

import Socket from '../Socket'

import ChatList from './ChatList'
import ChatFeed from './ChatFeed'
import ChatSettings from './ChatSettings'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const ChatEngine = props => {
  const context = useContext(ChatEngineContext)
  const { height } = props

  return (
    <div style={{ textAlign: 'left', backgroundColor: 'white' }}>
      <Socket {...props} />

      <Row>
        <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
          {
            props.renderChatList ?
            props.renderChatList({...props, ...context}) :
            <ChatList { ...props} />
          }
        </Col>

        <Col xs={12} sm={6} style={{ height: height ? height : '' }}>
          {
            props.renderChatFeed ?
            props.renderChatFeed({...props, ...context}) :
            <ChatFeed { ...props} />
          }
        </Col>

        <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
          {
            props.renderChatSettings ?
            props.renderChatSettings({...props, ...context}) :
            <ChatSettings { ...props} />
          }
        </Col>
      </Row>
    </div>
  )
}

export default ChatEngine