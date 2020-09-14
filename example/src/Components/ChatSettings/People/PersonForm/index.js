import React from 'react';

import { addPerson } from 'react-chat-engine'

export default class PersonForm extends React.Component {
  state = {
    value: ''
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    addPerson(
      this.props.creds,
      this.props.chat.id,
      this.state.value,
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} id="new-msg-form">
        <label>
          Username:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <input type="submit" value="Add Person" />
      </form>
    );
  }
}