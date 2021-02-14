import React from 'react'

import SocketConnector from './components'

import { isTyping } from './actions/typing'
import { getChats, newChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat } from './actions/people'
import { getMessages, sendMessage, editMessage, deleteMessage } from './actions/messages'

import { Avatar, Dot } from './components/ChatUi/components/Avatar'

const ChatEngine = (props) => {
  return <SocketConnector {...props} />
}

export {
  ChatEngine,

  Avatar,
  Dot,
  
  getChats,
  newChat,
  editChat,
  deleteChat,

  addPerson,
  removePerson,
  getOtherPeople,
  getMyData,
  editMyData,
  leaveChat,

  getMessages,
  sendMessage,
  editMessage,
  deleteMessage,

  isTyping,
}