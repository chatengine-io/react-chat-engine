import React from 'react';

import { sendMessage } from 'react-chat-engine'

export default class MessageForm extends React.Component {
    state = {
        value: ''
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();

        sendMessage(
            this.props.creds, 
            this.props.chatId, 
            { text: this.state.value }
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)} id="new-msg-form">
          <label>
            Message:
            <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
}