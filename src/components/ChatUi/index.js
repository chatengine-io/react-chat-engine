import React, { Component } from 'react'

import _ from 'lodash'

import { getChats } from '../../actions/chats'
import { getMessages } from '../../actions/messages'

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
  }

  onFailAuth(creds) {
    this.setState({ creds: undefined })
  }

  setActiveChat(chatId) {
    this.setState({ activeChat: chatId })
    getMessages(this.state.creds, chatId)
  }

  onGetChats(chats) {
    if (chats.length > 0) { this.setActiveChat(chats[0].id) }
    this.setState({ chats: _.mapKeys(chats, 'id') })
  }

  onNewChat(chat) {
    const { chats } = this.state
    chats[chat.id] = chat
    this.setState({ chats, activeChat: chat.id })
  }

  onEditChat(chat) {
    const { chats } = this.state
    chats[chat.id] = chat
    this.setState({ chats })
  }

  onDeleteChat(chat) {
    const { chats } = this.state
    chats[chat.id] = undefined
    this.setState({ chats })
  }

  onGetMessages(chatId, messages) {
    this.setState({ messages: _.mapKeys(messages, 'id') })
  }

  onNewMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = message
      this.setState({ messages })
    }
  }

  onEditMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = message
      this.setState({ messages })
    }
  }

  onDeleteMessage(chatId, message) {
    if (chatId === this.state.activeChat) {
      const { messages } = this.state
      messages[message.id] = undefined
      this.setState({ messages })
    }
  }

  render() {
    return (
      <div>

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

          <Col sm={3}>
            <ChatList 
              creds={this.state.creds} 
              chats={this.state.chats} 
              activeChat={this.state.activeChat}
              onChatClick={(chatId) => this.setActiveChat(chatId)} 
              renderNewChatForm={this.props.renderNewChatForm}
            />
          </Col>

          <Col sm={6}>
            <ChatFeed 
              creds={this.state.creds} 
              chats={this.state.chats} 
              chatId={this.state.activeChat} 
              messages={this.state.messages} 
            />
          </Col>

          <Col sm={3}>
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
