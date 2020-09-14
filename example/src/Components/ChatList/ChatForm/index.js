import React from 'react';

import { newChat } from 'react-chat-engine'

export default class MessageForm extends React.Component {
    state = {
        value: ''
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();

        newChat(
            this.props.creds, 
            { title: this.state.value }
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Title:
            <input type="title" value={this.state.value} onChange={this.handleChange.bind(this)} />
          </label>
          <input type="submit" value="New Chat" />
        </form>
      );
    }
}