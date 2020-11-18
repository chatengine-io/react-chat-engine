import React from 'react';

import { editMessage } from 'react-chat-engine'

import { Button } from '../../components/Button'
import { TextInput } from '../../components/Input'

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
            { text: this.state.value },
            (data) => {}
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          
          <TextInput 
            type="text" 
            label='Edit message...'
            value={this.state.value} 
            style={{ width: 'calc(100% - 84px)' }}
            handleChange={this.handleChange.bind(this)} 
          />
          
          <Button type="submit" value="Edit" />

        </form>
      );
    }
}