import React, { Component } from 'react'

import _ from 'lodash'

import { ChatEngine, getChats, getMessages } from 'react-chat-engine'

import ChatList from './Components/ChatList'
import ChatFeed from './Components/ChatFeed'
import ChatSettings from './Components/ChatSettings'

class App extends Component {
  state = {
    creds: {},
    chats: {},
    messages: {},
    activeChat: null,
  }

  onConnect(creds) {
    this.setState({ creds })
    getChats(creds)
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
    this.setState({ chats })
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

        <ChatEngine
          publicKey={'6781ca86-9ebf-47b0-88a9-37e88a356235'}
          userName={'john_smith'}
          userSecret={'pass1234'}
          onConnect={(creds) => this.onConnect(creds)}
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

        <div style={{ content: "", display: 'table', clear: 'both' }}>

          <ChatList
            creds={this.state.creds}
            chats={this.state.chats}
            onChatClick={(chatId) => this.setActiveChat(chatId)}
          />

          <ChatFeed
            creds={this.state.creds}
            chatId={this.state.activeChat}
            messages={this.state.messages}
          />

          <ChatSettings
            creds={this.state.creds}
            chat={this.state.chats[this.state.activeChat]}
          />

        </div>

      </div>
    )
  }
}

export default App;
