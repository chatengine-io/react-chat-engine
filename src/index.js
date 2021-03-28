import ChatEngine from './components'

import Socket from './components/Socket'
import ChatSocket from './components/Socket/ChatSocket'

import { isTyping } from './actions/typing'
import { getChats, newChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat } from './actions/people'
import { getMessages, sendMessage, editMessage, deleteMessage } from './actions/messages'

import { Avatar, Dot } from './components/ChatEngine/components/Avatar'
import { Button } from './components/ChatEngine/components/Button'
import { TextInput, TextAreaInput, AutoCompleteInput } from './components/ChatEngine/components/Input'

import { ChatEngineProvider } from './components/Context'

import ChatList from './components/ChatEngine/ChatList'
import ChatCard from './components/ChatEngine/ChatList/ChatCard'
import NewChatForm from './components/ChatEngine/ChatList/NewChatForm'

import ChatFeed from './components/ChatEngine/ChatFeed'
import ChatHeader from './components/ChatEngine/ChatFeed/ChatHeader'
import MessageBubble from './components/ChatEngine/ChatFeed/MessageBubble'
import IsTyping from './components/ChatEngine/ChatFeed/IsTyping'
import NewMessageForm from './components/ChatEngine/ChatFeed/NewMessageForm'

import ChatSettings from './components/ChatEngine/ChatSettings'
import ChatSettingsTop from './components/ChatEngine/ChatSettings/ChatSettingsTop'
import PeopleSettings from './components/ChatEngine/ChatSettings/PeopleSettings'
import PhotosSettings from './components/ChatEngine/ChatSettings/PhotosSettings'
import OptionsSettings from './components/ChatEngine/ChatSettings/OptionsSettings'

export {
  ChatEngineProvider,

  ChatEngine, 
  
  Socket, ChatSocket,

  Avatar, Dot,
  Button,
  TextInput, TextAreaInput, AutoCompleteInput,
  
  ChatList, ChatCard, NewChatForm,
  ChatFeed, ChatHeader, MessageBubble, IsTyping, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings,
  
  getChats, newChat, editChat, deleteChat,
  addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat,
  getMessages, sendMessage, editMessage, deleteMessage,
  isTyping,
}