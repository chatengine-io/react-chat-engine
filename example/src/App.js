import React, { Component } from 'react'

import { ChatEngine } from 'react-chat-engine'

export default class App extends Component {

  render() {
    return (
      <ChatEngine
          development
          publicKey={'1ed59673-1fd6-46ed-9eb9-56239a6a4f82'}
          userName={'john_smith'}
          userSecret={'pass1234'}
      />
    )
  }
}
