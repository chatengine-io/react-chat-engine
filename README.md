<p align="center" >
    <p align="center" >
        <a href="https://chatengine.io/">
            <img    
                alt="react-chat-engine" 
                style='max-height: 333px; max-width: 100%;'
                src="https://chat-engine-assets.s3.amazonaws.com/react-chat-engine.gif" 
            />
        </a>
    </p>
</p>

## Chat Engine

Chat Engine is a free serverless chat API.

Try our free plan at [chatengine.io](https://chatengine.io)

## Installation

- Using [npm](https://www.npmjs.com/#getting-started): `npm install react-chat-engine --save`
- Using [Yarn](https://yarnpkg.com/): `yarn add react-chat-engine`

## Quick Start

Add serverless chat to your React app in 3 minutes.

1. Register then create a **project** and **user** at [chatengine.io](https://chatengine.io)

2. Collect the **public key**, **username** and **user password**

3. Install `yarn add react-chat-engine`

4. Import the `ChatEngine` component and pass in `publicKey`, `userName`, and `userSecret` props

5. Voila! You're done

EXAMPLE: Your implementation should look like the following

```jsx
import React from 'react'

import { ChatEngine } from 'react-chat-engine'

export function App() {
  return (
    <ChatEngine
      publicKey={'b75e5bd5-cd84-404c-b820-06feff8c98c0'}
      userName={'john_smith'}
      userSecret={'secret_1234'}
    />
  )
}
```

## Features

- Authenticate users
- Subscribe (connect) to incoming chats and messages
- Create chats and messages
- Add and remove people from chats
- Edit and delete chat and message data

## Props

- **`publicKey`** _(UUID REQUIRED)_ - Public API key for your [chatengine.io](https://chatengine.io) project
- **`userName`** _(String REQUIRED)_ - Username of a person in this project
- **`userSecret`** _(String REQUIRED)_ - Set a secret for this person and use it to authenticate.
- **`onConnect`** (Function) - Callback when the connection/authentication is complete
- **`onFailAuth`** (Function) - Callback when the connection/authentication fails
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
- **`hideUI`** _(Boolean)_ - Hides all UI components for a custom implementation (Warning: Advanced)

## Functions

```
import { functionName } from 'react-chat-engine'

...

functionName(conn, args)
```

- **`getChats`** _(conn) => void_ - Get a person's array of chats
- **`newChat`** _(conn, title) => void_ - Create a new chat with this person as admin
- **`editChat`** _(conn, chatId, chatObj) => void_ - Edit the title of an existing chat
- **`deleteChat`** _(conn, chatId) => void_ - If you're admin, delete this existing chat
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
