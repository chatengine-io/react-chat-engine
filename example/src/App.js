import React, { Component } from 'react'

import { ChatEngine } from 'react-chat-engine'

const users = [
  {
    userName: 'John_Doe',
    userSecret: 'pass1234',
  },
  {
    userName: 'Jane_Smith',
    userSecret: 'pass1234',
  },
  {
    userName: 'Adam_La_Morre',
    userSecret: 'pass1234',
  }
]

export default class App extends Component {
  render() {
    const user = users[Math.floor(Math.random() * users.length)]

    return (
      <div style={{ width: '100vw',  backgroundColor: '#e6f7ff' }}>
        <ChatEngine
          // Creds
          development
          hideUI={true}
          projectID='1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
          userName={user.userName}
          userSecret={user.userSecret}
          // Hooks
          onDeleteChat={(chatId, message) => console.log('DELERE')}
          // Custom UI
          height='100vh'
          // renderPeopleSettings={(chatId) => {}} 
        />
      </div>
    )
  }
}
