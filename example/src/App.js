import React, { Component } from 'react'

import { ChatEngine, editMyData } from 'react-chat-engine'

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
  onConnect(props) {
    editMyData(props, { is_online: true }, () => {})
  }

  render() {
    const user = users[Math.floor(Math.random() * users.length)]

    return (
      <div style={{ width: '100vw',  backgroundColor: '#e6f7ff' }}>
        <ChatEngine
          // Creds
          development
          projectID='f201552a-846d-459d-b863-1ac6be77b5a4'
          userName='adam_lamorre'
          userSecret={user.userSecret}
          // Hooks
          // onConnect={(props) => this.onConnect(props)}
          // Custom UI
          height='100vh'
          // renderPeopleSettings={(chatId) => {}} 
        />
      </div>
    )
  }
}
