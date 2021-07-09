import React, { useContext } from 'react'

import { ChatEngineContext } from '../Context'

import _ from 'lodash'

import { Socket } from '../Sockets'

import ChatList from './ChatList'
import ChatFeed from './ChatFeed'
import ChatSettings from './ChatSettings'

import { Row, Col } from 'react-grid-system'
import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const ChatEngine = props => {
  const context = useContext(ChatEngineContext)
  const { height } = props
  const propsAndContext = {...props, ...context}

  return (
    <div style={{ textAlign: 'left', backgroundColor: 'white' }}>
      <Socket {...props} />

      <Row>
        <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
          {
            props.renderChatList ?
            props.renderChatList(propsAndContext) :
            <ChatList {...propsAndContext} />
          }
        </Col>

        <Col xs={12} sm={6} style={{ height: height ? height : '' }}>
          {
            props.renderChatFeed ?
            props.renderChatFeed(propsAndContext) :
            <ChatFeed {...propsAndContext} />
          }
        </Col>

        <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
          {
            props.renderChatSettings ?
            props.renderChatSettings(props) :
            <ChatSettings { ...props} />
          }
        </Col>
      </Row>
    </div>
  )
}

export default ChatEngine