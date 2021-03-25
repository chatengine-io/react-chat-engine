import React, { useContext, useEffect, useRef } from 'react'

import { ChatEngineContext } from './context'

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

const App = props => {
  const didMountRef = useRef(false)
  const {
    // The hooks needs ti be rendered up here
    setConnecting,                        // Socket
    conn, setConn,                        // Socket
    chats, setChats,                      // Chat List
    messages, setMessages,                // Chat Feed
    sendingMessages, setSendingMessages,  // Chat Feed
    activeChat, setActiveChat,            // Prop to Chat feed
    typingCounter, setTypingCounter,      // Up here
    typingData, setTypingData,            // Up here
  } = useContext(ChatEngineContext)
  const context = useContext(ChatEngineContext)

  function sortChats(chats) {
    return Object.values(chats).sort((a, b) => { 
      const aDate = a.last_message.created ? new Date(a.last_message.created) : new Date(a.created)
      const bDate = b.last_message.created ? new Date(b.last_message.created) : new Date(b.created)
      return new Date(bDate) - new Date(aDate); 
    })
  }

  function onConnect(conn) {
    setConnecting(false)
    setConn(conn)

    getChats(conn, (chats) => onGetChats(chats, conn))

    props.onConnect && props.onConnect(conn)
  }

  function onFailAuth(conn) {
    setConn(undefined)

    props.onFailAuth && props.onFailAuth(conn)
  }

  function switchActiveChat(chatId, connOptional) {
    const conn = connOptional ? connOptional : props

    setActiveChat(chatId)

    getMessages(conn, chatId, (chatId, messages) => onGetMessages(chatId, messages, conn))
  }

  function onGetChats(chats, connOptional) {
    const conn = connOptional ? connOptional : props
    chats = sortChats(chats)

    if (chats.length > 0 && activeChat === null) {
      switchActiveChat(chats[0].id, conn) 
    }
    
    setChats(_.mapKeys(chats, 'id'))
  }

  function onNewChat(chat) {
    if (chats) {
      chats[chat.id] = chat
      setChats(chats)
      switchActiveChat(chat.id)
    }

    props.onNewChat && props.onNewChat(chat)
  }

  function onEditChat(chat) {    
    if (chats) {
      chats[chat.id] = chat
      setChats(chats)
    }

    props.onEditChat && props.onEditChat(chat)
  }

  function onDeleteChat(chat) {    
    if (chats) {
      chats[chat.id] = undefined
      
      setChats(chats)

      if (!_.isEmpty(chats)) {
        const sortedChats = sortChats(chats)
        switchActiveChat(sortedChats[0] ? parseInt(sortedChats[0].id) : 0)
      }
    }

    props.onDeleteChat && props.onDeleteChat(chat)
  }

  function onGetMessages(chatId, messages, connOptional) {
    const conn = connOptional ? connOptional : props

    setMessages(_.mapKeys(messages, 'id'))

    if (messages.length > 0) {
      const messageId = messages[messages.length - 1].id
      readMessage(conn, chatId, messageId, (chat) => onEditChat(chat))
    }
    
    props.onGetMessages && props.onGetMessages(chatId, messages)
  }

  function sendingMessage(message) {
    setSendingMessages({
      ...sendingMessages,
      [message.custom_json.sender_id]: message
    })
  }

  function onNewMessage(chatId, message) {
    if (typeof message.custom_json === "string" && message.custom_json.indexOf('sender_id') !== -1) {
      sendingMessages[JSON.parse(message.custom_json).sender_id] = undefined
      setSendingMessages(sendingMessages)
    }

    if (chatId === activeChat) {
      messages[message.id] = message
      setMessages(messages)
    }

    readMessage(conn, activeChat, message.id, (chat) => onEditChat(chat))

    props.onNewMessage && props.onNewMessage(chatId, message)
  }

  function onEditMessage(chatId, message) {
    if (chatId === activeChat) {
      messages[message.id] = message
      setMessages(messages)
    }

    props.onEditMessage && props.onEditMessage(chatId, message)
  }

  function onDeleteMessage(chatId, message) {
    if (chatId === activeChat) {
      messages[message.id] = undefined
      setMessages(messages)
    }

    props.onDeleteMessage && props.onDeleteMessage(chatId, message)
  }

  function onTyping(chatId, person) {
    if (typingCounter[chatId] && typingCounter[chatId][person]) {
      setTypingCounter({
        ...typingCounter,
        [chatId]: {
          ...typingCounter[chatId],
          [person]: typingCounter[chatId][person] + 1
        }
      })

    } else {
      setTypingCounter({
        ...typingCounter,
        [chatId]: {
          ...typingCounter[chatId],
          [person]: 1
        }
      })
    }

    setTimeout(() => {
      setTypingCounter({
        ...typingCounter,
        [chatId]: {
          ...typingCounter[chatId],
          [person]: typingCounter[chatId][person] - 1
        }
      })
    }, 2500)

    props.onTyping && props.onTyping(chatId, person)
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      getChats(props, (chats) => onGetChats(chats))

    } else {
      Object.keys(typingCounter).map((chat) => {
        let typers = []
  
        Object.keys(typingCounter[chat]).map((person) => {
          if (typingCounter[chat][person] > 0) {
            typers.push(person)
          }
        })
  
        if (!typingData[chat] || typingData[chat].length !== typers.length) {
          setTypingData({ ...typingData, [chat]: typers })
        }
      })
    }
  })

  const { height } = props

  return (
    <div style={{ textAlign: 'left', backgroundColor: 'white' }}>
      <Socket
        {...props}
        onConnect={(props) => onConnect(props)}
        onDisconnect={() => setState({ connecting: true })}
        onFailAuth={(props) => onFailAuth(props)}
        onNewChat={(chat) => onNewChat(chat)}
        onEditChat={(chat) => onEditChat(chat)}
        onDeleteChat={(chat) => onDeleteChat(chat)}
        onAddPerson={(chat) => onEditChat(chat)}
        onRemovePerson={(chat) => onEditChat(chat)}
        // onTyping={(chatId, person) => onTyping(chatId, person)}
        onNewMessage={(chatId, message) => onNewMessage(chatId, message)}
        onEditMessage={(chatId, message) => onEditMessage(chatId, message)}
        onDeleteMessage={(chatId, message) => onDeleteMessage(chatId, message)}
      />

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

export default App
