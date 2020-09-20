import React from 'react';

import { newChat } from 'react-chat-engine'

import { Button } from '../../components/Button'
import { TextInput } from '../../components/Input'

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
            { title: this.state.value },
            () => this.setState({ value: '' })
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          
          <TextInput 
            label='Title'
            value={this.state.value}
            style={{ width: 'calc(100% - 18px)' }}
            handleChange={(e) => this.handleChange(e)}
          />

          <Button 
            type="submit" 
            value="New Chat" 
            style={{ width: '100%' }}
          />

        </form>
      );
    }
}