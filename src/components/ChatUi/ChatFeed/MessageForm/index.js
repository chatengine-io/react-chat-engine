import React from 'react';

import { sendMessage } from 'react-chat-engine'

import { Button } from '../../components/Button'
import { TextAreaInput } from '../../components/Input'

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
        { text: this.state.value },
        () => this.setState({ value: '' })
      )
    }
  
    render() {
      return (
        <div style={{ position: 'absolute', bottom: '12px', width: '90%', left: '5%' }}>

          <form 
            id="new-msg-form"
            onSubmit={this.handleSubmit.bind(this)} 
          >

            <div style={ styles.inputContainer }>

              <TextAreaInput 
                label='Send a message...' 
                value={this.state.value} 
                handleChange={this.handleChange.bind(this)} 
              />

              <div style={{ float: 'right', position: 'relative', top: '1px', right: '1px' }}>
                <Button type="submit" icon='send' />
              </div>

            </div>

          </form>
          
        </div>
      );
    }
}

const styles = {
  inputContainer: { 
    width: '100%', 
    borderRadius: '24px', 
    backgroundColor: 'white', 
    border: '1px solid rgb(217, 217, 217)'
  }
}