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

export default class App extends Component {
  state = {
    connecting: true,
    creds: null,
    chats: null,
    messages: {},
    activeChat: null,
    typingCounter: {},
    typingData: {},
    onChatClick: (chatId) => this.setActiveChat(chatId)
  }

  sortChats(chats) {
    return Object.values(chats).sort((a, b) => { 
      const aDate = a.last_message.created ? new Date(a.last_message.created) : new Date(a.created)
      const bDate = b.last_message.created ? new Date(b.last_message.created) : new Date(b.created)
      return new Date(bDate) - new Date(aDate); 
    })
  }

  onConnect(creds) {
    this.setState({ creds, connecting: false })
    getChats(creds, () => {})

    this.props.onConnect && this.props.onConnect(creds)
  }

  onFailAuth(creds) {
    this.setState({ creds: undefined })

    this.props.onFailAuth && this.props.onFailAuth(creds)
  }

  setActiveChat(chatId) {
    this.setState({ activeChat: chatId })
    getMessages(this.state.creds, chatId, () => {})
  }

  onGetChats(chats) {
    chats = this.sortChats(chats)

    if (chats.length > 0) { this.setActiveChat(chats[0].id) }
    this.setState({ chats: _.mapKeys(chats, 'id') })

    this.props.onGetChats && this.props.onGetChats(chats)
  }

  onNewChat(chat) {
    const { chats } = this.state

    if (chats) {
      chats[chat.id] = chat
      this.setState({ chats })
      this.setActiveChat(chat.id)
    }

    this.props.onNewChat && this.props.onNewChat(chat)
  }

  onEditChat(chat) {
    const { chats } = this.state
    
    if (chats) {
      chats[chat.id] = chat
      this.setState({ chats })
    }

    this.props.onEditChat && this.props.onEditChat(chat)
  }

  onDeleteChat(chat) {
    const { chats } = this.state
    

    if (chats) {
      chats[chat.id] = undefined
      this.setState({ chats })
      if (!_.isEmpty(chats)) {
        const sortedChats = this.sortChats(chats)
        this.setActiveChat(sortedChats[0] ? parseInt(sortedChats[0].id) : 0)
      }
    }

    this.props.onDeleteChat && this.props.onDeleteChat(chat)
  }

  onGetMessages(chatId, messages) {
    this.setState({ messages: _.mapKeys(messages, 'id') })

    if (messages.length > 0) {
      const messageId = messages[messages.length - 1].id
      readMessage(this.state.creds, this.state.activeChat, messageId, () => {})
    }
    
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

  onTyping(chatId, person) {
    if (this.state.typingCounter[chatId] && this.state.typingCounter[chatId][person]) {
      this.setState({
        ...this.state,
        typingCounter: {
          ...this.state.typingCounter,
          [chatId]: {
            ...this.state.typingCounter[chatId],
            [person]: this.state.typingCounter[chatId][person] + 1
          }
        }
      })

    } else {
      this.setState({
        ...this.state,
        typingCounter: {
          ...this.state.typingCounter,
          [chatId]: {
            ...this.state.typingCounter[chatId],
            [person]: 1
          }
        }
      })
    }

    this.props.onTyping && this.props.onTyping(chatId, person)

    setTimeout(() => {
      this.setState({
        ...this.state,
        typingCounter: {
          ...this.state.typingCounter,
          [chatId]: {
            ...this.state.typingCounter[chatId],
            [person]: this.state.typingCounter[chatId][person] - 1
          }
        }
      })
    }, 1250);
  }

  componentDidMount() { getChats(this.props) }

  componentDidUpdate() {
    const { typingCounter, typingData } = this.state

    Object.keys(typingCounter).map((chat) => {
      let typers = []

      Object.keys(typingCounter[chat]).map((person) => {
        if (typingCounter[chat][person] > 0) {
          typers.push(person)
        }
      })

      if (!typingData[chat] || typingData[chat].length !== typers.length) {
        this.setState({ ...this.state, typingData: { ...this.state.typingData, [chat]: typers } })
      }
    })
  }

  componentDidMount() { getChats(this.props, (chats) => this.onGetChats(chats)) }

  render() {
    const { height } = this.props

    return (
      <div style={{ textAlign: 'left', backgroundColor: 'white' }}>
        <Socket
          {...this.props}
          // API Hooks
          onConnect={(props) => this.onConnect(props)}
          onDisconnect={() => this.setState({ connecting: true })}
          onFailAuth={(props) => this.onFailAuth(props)}
          onGetChats={(chats) => this.onGetChats(chats)}
          onNewChat={(chat) => this.onNewChat(chat)}
          onEditChat={(chat) => this.onEditChat(chat)}
          onDeleteChat={(chat) => this.onDeleteChat(chat)}
          onAddPerson={(chat) => this.onEditChat(chat)}
          onRemovePerson={(chat) => this.onEditChat(chat)}
          onTyping={(chatId, person) => this.onTyping(chatId, person)}
          onGetMessages={(chatId, messages) => this.onGetMessages(chatId, messages)}
          onNewMessage={(chatId, message) => this.onNewMessage(chatId, message)}
          onEditMessage={(chatId, message) => this.onEditMessage(chatId, message)}
          onDeleteMessage={(chatId, message) => this.onDeleteMessage(chatId, message)}
        />

        <Row>
          <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
            {
              this.props.renderChatList ?
              this.props.renderChatList({...this.props, ...this.state}) :
              <ChatList {...this.props} {...this.state} />
            }
          </Col>

          <Col xs={12} sm={6} style={{ height: height ? height : '' }}>
            {
              this.props.renderChatFeed ?
              this.props.renderChatFeed({...this.props, ...this.state}) :
              <ChatFeed {...this.props} {...this.state} />
            }
          </Col>

          <Col xs={0} sm={3} style={{ height: height ? height : '' }}>
            {
              this.props.renderChatSettings ?
              this.props.renderChatSettings({...this.props, ...this.state}) :
              <ChatSettings {...this.props} {...this.state} />
            }
          </Col>
        </Row>
      </div>
    )
  }
}
