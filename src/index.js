import { ChatEngineWrapper, ChatEngineContext } from './components/Context'

import ChatEngine from './components'

import Socket from './components/Socket'
import ChatSocket from './components/Socket/ChatSocket'

import { Avatar, Dot } from './components/ChatEngine/components/Avatar'
import { Button } from './components/ChatEngine/components/Button'
import { TextInput, TextAreaInput, AutoCompleteInput } from './components/ChatEngine/components/Input'


import { getChats, newChat, getLatestChats, getChat, editChat, deleteChat } from './actions/chats'
import { addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat } from './actions/people'
import { getMessages, getLatestMessages, sendMessage, getMessage, editMessage, deleteMessage } from './actions/messages'
import { isTyping } from './actions/typing'

import ChatList from './components/ChatEngine/ChatList'
import ChatCard from './components/ChatEngine/ChatList/ChatCard'
import NewChatForm from './components/ChatEngine/ChatList/NewChatForm'

import ChatFeed from './components/ChatEngine/ChatFeed'
import ChatHeader from './components/ChatEngine/ChatFeed/ChatHeader'
import MessageBubble from './components/ChatEngine/ChatFeed/Messages/MessageBubbles'
import Typers from './components/ChatEngine/ChatFeed/Typers'
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
  TextInput, TextAreaInput, AutoCompleteInput,
  
  getChats, newChat, getLatestChats, getChat, editChat, deleteChat,
  addPerson, removePerson, getOtherPeople, getMyData, editMyData, leaveChat,
  getMessages, getLatestMessages, sendMessage, getMessage, editMessage, deleteMessage,
  isTyping,

  ChatList, ChatCard, NewChatForm,
  ChatFeed, ChatHeader, MessageBubble, Typers, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings,
}