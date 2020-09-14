## Chat Engine

Chat Engine is the first cheap, easy, and scalable chat API.

Try our free basic plan at [chatengine.io](https://www.chatengine.io)

## Features

- Authenticate users
- Subscribe (connect) to incoming chats and messages
- Create chats and messages
- Add and remove people from chats
- Edit and delete chat and message data

## Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install react-chat-engine --save`
- Using [Yarn](https://yarnpkg.com/): `yarn add react-chat-engine`

## Example

```jsx
import React, { Component } from 'react'

import _ from 'lodash'

import { ChatEngine, getChats, getMessages } from 'react-chat-engine'


export default class App extends Component {
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
            <ChatEngine
                publicKey={'b75e5bd5-cd84-404c-b820-06feff8c98c0'}
                userName={'john_smith'}
                userSecret={'secret_1234'}
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
        )
    }
}
```

## Complete Example
See [`App.js`](https://github.com/alamorre/react-chat-engine/blob/master/src/demo/App.js) for a working demo!

## Props

- **`publicKey`** _(UUID REQUIRED)_ - Public API key for your [chatengine.io](https://www.chatengine.io) project
- **`userName`** _(String REQUIRED)_ - Username of a person in this project
- **`userSecret`** _(String REQUIRED)_ - Secret for the person in this project
- **`onConnect`** (Function) - Callback when the connection/authentication is complete
- **`onGetChats`** _(Function)_ Callback when the person fetches their chats array
- **`onNewChat`** _(Function)_ - Callback when the person creates a new chat
- **`onEditChat`** _(Function)_ - Callback when the person edits a chat title
- **`onDeleteChat`** _(Function)_ - Callback when the person deletes one of their chats (must the chat's admin)
- **`onAddPerson`** _(Function)_ - Callback when a person is added to a chat
- **`onRemovePerson`** _(Function)_ - Callback when a person is removed/deleted from a chat
- **`onGetMessages`** _(Function)_ - Callback when the person gets a chat's messages
- **`onNewMessage`** _(Function)_ - Callback when a person posts a new message in one of the chats
- **`onEditMessage`** _(Function)_ - Callback when a person edits a new message in one of the chats
- **`onDeleteMessage`** _(Function)_ - Callback when a person deletes a new message in one of the chats


## Functions

```
import { functionName } from 'react-chat-engine'

...

functionName(creds, args)
```

- **`getChats`** _(creds) => void_ - Get a person's array of chats
- **`newChat`** _(creds, title) => void_ - Create a new chat with this person as admin
- **`editChat`** _(creds, chatId, chatObj) => void_ - Edit the title of an existing chat
- **`deleteChat`** _(creds, chatId) => void_ - If you're admin, delete this existing chat
- **`addPerson`** _(props, chatId, userName) => void_ - Add an existing person (in the project) to an existing chat
- **`removePerson`** _(props, chatId, userName) => void_ - If you're admin, remove this user from an existing chat
- **`getMessages`** _(props, chatId) => void_ - Get the messages for an existing chat
- **`sendMessage`** _(props, chatId, messageObj) => void_ - Send a new message object into this chat
- **`editMessage`** _(props, chatId, messageId, messageObj) => void_ - Edit an exiting message object in this chat
- **`deleteMessage`** _(props, chatId, messageId) => void_ - Delete an exiting message object from this chat


## Objects

### Chat Object

- **`id`** _(int)_ - Unique primary key to identify this chat
- **`admin`** _(String)_ - Unique username of the person who created this chat
- **`title`** _(String)_ - Optional title of this chat
- **`created`** _(Datetime)_ - Date-time of chat creation
- **`people`** _(Array)_ - Array of people added to this chat

```
{
    "id": 1,
    "admin": "john_smith",
    "title": "Canada Day Party!",
    "created": "2020-09-05T20:28:22.352373Z",
    "people": [
        {
            "person": "john_smith"
        }
    ]
}
```

### Chat / Person Association

- **`person`** _(String)_ - Unique username of a person involved in this chat

```
{ person: "john_smith" }
```

### Message Object

- **`id`** _(int)_ - Unique primary key to identify this message
- **`sender`** _(String)_ - Unique username of the person who sent this message
- **`text`** (String) - Contents of the message sent
- **`created`** (Datetime) - Date-time of message creation

```
{
    "id": 1,
    "sender": "john_smith",
    "text": "Hey let's party!",
    "created": "2020-09-07T13:20:26.936400Z"
}
```
