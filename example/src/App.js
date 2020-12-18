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
      <div style={{ width: '100vw',  backgroundColor: '#e6f7ff', paddingTop: '100vh' }}>
        <ChatEngine
          // Creds
          development
          projectID='1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
          userName={user.userName}
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
