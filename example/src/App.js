import React from 'react'

import { ChatEngine } from 'react-chat-engine'

const users = [
  {
    userName: 'john_smith',
    userPassword: 'pass1234',
  },
  {
    userName: 'jane_smith',
    userPassword: 'pass1234',
  },
  {
    userName: 'adam_lamorre',
    userPassword: 'pass1234',
  }
]

export function App () {
  const user = users[Math.floor(Math.random() * users.length)]

  return (
    <ChatEngine
      development
      publicKey={'1ed59673-1fd6-46ed-9eb9-56239a6a4f82'}
      userName={user.userName}
      userPassword={user.userPassword}
    />
  )
}
