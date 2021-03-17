import ChatEngine from './components'

import Socket from './components/Socket'

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
import MessageBubble from './components/ChatUi/ChatFeed/MessageBubble'
import IsTyping from './components/ChatUi/ChatFeed/IsTyping'
import NewMessageForm from './components/ChatUi/ChatFeed/NewMessageForm'

import ChatSettings from './components/ChatUi/ChatSettings'
import ChatSettingsTop from './components/ChatUi/ChatSettings/ChatSettingsTop'
import PeopleSettings from './components/ChatUi/ChatSettings/PeopleSettings'
import PhotosSettings from './components/ChatUi/ChatSettings/PhotosSettings'
import OptionsSettings from './components/ChatUi/ChatSettings/OptionsSettings'

export {
  ChatEngine, Socket,

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