import React from 'react'

import SocketConnector from './components'

import { isTyping } from './actions/typing'
import { getChats, newChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat } from './actions/people'
import { getMessages, sendMessage, editMessage, deleteMessage } from './actions/messages'

import { Avatar, Dot } from './components/ChatUi/components/Avatar'
import { Button } from './components/ChatUi/components/Button'
import { TextInput, TextAreaInput, AutoCompleteInput } from './components/ChatUi/components/Input'

import ChatList from './components/ChatUi/ChatList'
import ChatCard from './components/ChatUi/ChatList/ChatCard'
import NewChatForm from './components/ChatUi/ChatList/NewChatForm'

import ChatFeed from './components/ChatUi/ChatFeed'
import ChatHeader from './components/ChatUi/ChatFeed/ChatHeader'
import MessageForm from './components/ChatUi/ChatFeed/MessageForm'

const ChatEngine = (props) => {
  return <SocketConnector {...props} />
}

export {
  ChatEngine,

  Avatar, Dot,
  Button,
  TextInput, TextAreaInput, AutoCompleteInput,
  
  ChatList, ChatCard, NewChatForm,
  ChatFeed, ChatHeader, MessageForm,
  
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