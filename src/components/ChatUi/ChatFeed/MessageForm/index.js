import React from 'react';

import { sendMessage } from 'react-chat-engine'

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

        sendMessage(
            this.props.creds, 
            this.props.chatId, 
            { text: this.state.value }
        )
    }
  
    render() {
      return (
        <div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>

          <form 
            id="new-msg-form"
            onSubmit={this.handleSubmit.bind(this)} 
          >

            <TextInput 
              label='Send a message...' 
              value={this.state.value} 
              handleChange={this.handleChange.bind(this)} 
              style={{ width: 'calc(100% - 18px - 74px)' }}
            />

            <Button 
              type="submit" 
              value="Send" 
            />

          </form>
          
        </div>
      );
    }
}