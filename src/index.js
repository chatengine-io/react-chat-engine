import React from 'react'

import SocketConnector from './components'

import { isTyping } from './actions/typing'
import { getChats, newChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople } from './actions/people'
import { getMessages, sendMessage, editMessage, deleteMessage } from './actions/messages'

const ChatEngine = (props) => {
  return <SocketConnector {...props} />
}

export {
  ChatEngine,
  
  getChats,
  newChat,
  editChat,
  deleteChat,

  addPerson,
  removePerson,
  getOtherPeople,

  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,

  isTyping,
}