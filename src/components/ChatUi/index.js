import React, { Component } from 'react'

import _ from 'lodash'

import { getChats } from '../../actions/chats'
import { getMessages, readMessage } from '../../actions/messages'

import Socket from '../Socket'

import ChatList from './ChatList'
import ChatFeed from './ChatFeed'
import ChatSettings from './ChatSettings'

import { Row, Col } from 'react-grid-system'

import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

class App extends Component {
  state = {
    creds: null,
    chats: null,
    messages: {},
    activeChat: null,
  }

  onConnect(creds) {
    this.setState({ creds })
    getChats(creds)

    this.props.onConnect && this.props.onConnect(creds)
  }

  onFailAuth(creds) {
    this.setState({ creds: undefined })

    this.props.onFailAuth && this.props.onFailAuth(creds)
  }

  setActiveChat(chatId) {
    this.setState({ activeChat: chatId })
    getMessages(this.state.creds, chatId)
  }

  onGetChats(chats) {
    if (chats.length > 0) { this.setActiveChat(chats[0].id) }
    this.setState({ chats: _.mapKeys(chats, 'id') })

    this.props.onGetChats && this.props.onGetChats(chats)
  }

  onNewChat(chat) {
    const { chats } = this.state
    chats[chat.id] = chat
    this.setState({ chats, activeChat: chat.id })

    this.props.onNewChat && this.props.onNewChat(chat)
  }

  onEditChat(chat) {
    const { chats } = this.state
    chats[chat.id] = chat
    this.setState({ chats })

    this.props.onEditChat && this.props.onEditChat(chat)
  }

  onDeleteChat(chat) {
    const { chats } = this.state
    chats[chat.id] = undefined
    this.setState({ chats })

    this.props.onDeleteChat && this.props.onDeleteChat(chat)
  }

  onGetMessages(chatId, messages) {
    this.setState({ messages: _.mapKeys(messages, 'id') })

    const messageId = messages[messages.length - 1].id
    readMessage(this.state.creds, this.state.activeChat, messageId)
    
    this.props.onGetMessages && this.props.onGetMessages(chatId, messages)
  }

  onNewMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = message
      this.setState({ messages })
    }

    readMessage(this.state.creds, this.state.activeChat, message.id)

    this.props.onNewMessage && this.props.onNewMessage(chatId, message)
  }

  onEditMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = message
      this.setState({ messages })
    }

    this.props.onEditMessage && this.props.onEditMessage(chatId, message)
  }

  onDeleteMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = undefined
      this.setState({ messages })
    }

    this.props.onDeleteMessage && this.props.onDeleteMessage(chatId, message)
  }

  render() {
    const { height } = this.props

    return (
      <div style={{ textAlign: 'left' }}>

        <Socket 
          {...this.props} 
          // API Hooks
          onConnect={(creds) => this.onConnect(creds)}
          onFailAuth={(props) => this.onFailAuth(props)}
          onGetChats={(chats) => this.onGetChats(chats)}
          onNewChat={(chat) => this.onNewChat(chat)}
          onEditChat={(chat) => this.onEditChat(chat)}
          onDeleteChat={(chat) => this.onDeleteChat(chat)}
          onAddPerson={(chat) => this.onEditChat(chat)}
          onRemovePerson={(chat) => this.onEditChat(chat)}
          onGetMessages={(chatId, messages) => this.onGetMessages(chatId, messages)}
          onNewMessage={(chatId, message) => this.onNewMessage(chatId, message)}
          onEditMessage={(chatId, message) => this.onEditMessage(chatId, message)}
          onDeleteMessage={(chatId, message) => this.onDeleteMessage(chatId, message)}
        />

        <Row>

          <Col sm={3} style={{ height: height ? height : '', overflow: 'scroll' }}>
            <ChatList 
              creds={this.state.creds} 
              chats={this.state.chats} 
              activeChat={this.state.activeChat}
              onChatClick={(chatId) => this.setActiveChat(chatId)} 
              renderNewChatForm={this.props.renderNewChatForm}
            />
          </Col>

          <Col sm={6} style={{ height: height ? height : '', overflow: 'scroll' }}>
            <ChatFeed 
              creds={this.state.creds} 
              chats={this.state.chats} 
              chatId={this.state.activeChat} 
              messages={this.state.messages} 
            />
          </Col>

          <Col sm={3} style={{ height: height ? height : '', overflow: 'scroll' }}>
            <ChatSettings 
              creds={this.state.creds} 
              chat={this.state.chats && this.state.chats[this.state.activeChat]} 
            />
          </Col>

        </Row>

      </div>
    )
  }
}

export default App;
