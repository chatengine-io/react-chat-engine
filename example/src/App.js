import React from 'react'

import { ChatEngine } from 'react-chat-engine'

const users = [
  // {
  //   userName: 'John_Doe',
  //   userPassword: 'pass1234',
  // },
  // {
  //   userName: 'Jane_Smith',
  //   userPassword: 'pass1234',
  // },
  {
    userName: 'Adam_La_Morre',
    userPassword: 'pass1234',
  }
]

export function App () {
  const user = users[Math.floor(Math.random() * users.length)]

  return (
    <div style={{ width: '100vw',  backgroundColor: '#e6f7ff' }}>
      <ChatEngine
        // Creds
        development
        publicKey={'1ed59673-1fd6-46ed-9eb9-56239a6a4f82'}
        userName={user.userName}
        userPassword={user.userPassword}
        // Hooks
        // onNewMessage={(chatId, message) => console.log('COME ON')}
        // Render Custom Components
        height='100vh'
      />
    </div>
  )
}
