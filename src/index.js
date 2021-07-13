import { ChatEngineWrapper, ChatEngineContext } from './components/Context'

import ChatEngine from './components'

import { Socket, ChatSocket } from './components/Sockets'

import Button from './components/ChatEngine/components/Button'
import { Avatar, Dot } from './components/ChatEngine/components/Avatar'
import { TextInput, AutoCompleteInput } from './components/ChatEngine/components/Input'


import { getChats, newChat, getLatestChats, getChatsBefore, getOrCreateChat, getChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat } from './actions/people'
import { getMessages, getLatestMessages, sendMessage, getMessage, editMessage, readMessage, deleteMessage } from './actions/messages'
import { isTyping } from './actions/typing'

import ChatList from './components/ChatEngine/ChatList'
import ChatCard from './components/ChatEngine/ChatList/ChatCard'
import NewChatForm from './components/ChatEngine/ChatList/NewChatForm'

import ChatFeed from './components/ChatEngine/ChatFeed'
import ChatHeader from './components/ChatEngine/ChatFeed/ChatHeader'
import IceBreaker from './components/ChatEngine/ChatFeed/Steps/IceBreaker'
import MessageBubble from './components/ChatEngine/ChatFeed/Messages/Bubble'
import IsTyping from './components/ChatEngine/ChatFeed/IsTyping'
import ConnectionBar from './components/ChatEngine/ChatFeed/ConnectionBar'
import ScrollDownBar from './components/ChatEngine/ChatFeed/ScrollDownBar'
import NewMessageForm from './components/ChatEngine/ChatFeed/NewMessageForm'

import ChatSettings from './components/ChatEngine/ChatSettings'
import ChatSettingsTop from './components/ChatEngine/ChatSettings/ChatSettingsTop'
import PeopleSettings from './components/ChatEngine/ChatSettings/PeopleSettings'
import PhotosSettings from './components/ChatEngine/ChatSettings/PhotosSettings'
import OptionsSettings from './components/ChatEngine/ChatSettings/OptionsSettings'

export {
  ChatEngineWrapper, ChatEngineContext,

  ChatEngine,

  Socket, ChatSocket,

  Avatar, Dot,
  Button,
  TextInput, AutoCompleteInput,

  getChats, newChat, getLatestChats, getChatsBefore, getOrCreateChat, getChat, editChat, deleteChat,
  addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat,
  getMessages, getLatestMessages, sendMessage, getMessage, editMessage, readMessage, deleteMessage,
  isTyping,

  ChatList, ChatCard, NewChatForm,
  ChatFeed, ChatHeader, IceBreaker, MessageBubble, IsTyping, ConnectionBar, ScrollDownBar, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings,
}