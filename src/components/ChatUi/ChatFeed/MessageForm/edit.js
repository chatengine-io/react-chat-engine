import React from 'react';

import { editMessage } from 'react-chat-engine'

export default class MessageEditForm extends React.Component {
    state = {
        value: ''
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        
        editMessage(
            this.props.creds, 
            this.props.chatId, 
            this.props.message.id,
            { text: this.state.value }
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)} id="new-msg-form">
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}