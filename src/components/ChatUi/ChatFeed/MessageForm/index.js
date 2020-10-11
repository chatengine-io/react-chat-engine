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
        <form 
          id="new-msg-form"
          onSubmit={this.handleSubmit.bind(this)} 
          style={{ position: 'absolute', bottom: '12px', width: 'calc(100% - 24px)', left: '12px' }}
        >

          <div style={ styles.inputContainer }>

            <TextAreaInput 
              label='Send a message...' 
              value={this.state.value} 
              handleChange={this.handleChange.bind(this)} 
              onSubmit={this.handleSubmit.bind(this)} 
            />

            <Button 
              type="submit" 
              icon='send' 
              style={{ position: 'absolute', bottom: '2px', right: '0px' }} 
            />

          </div>

        </form>
        );
    }
}

const styles = {
  inputContainer: { 
    width: '100%', 
    minHeight: '38px',
    borderRadius: '24px', 
    backgroundColor: 'white', 
    border: '1px solid rgb(217, 217, 217)'
  },
  verticalCenter: {
    margin: '0px',
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)'
  },
  input: { 
    border: '1px solid white',     
    width: 'calc(100% - 64px - 24px)', // 24px for 12px 
    resize: 'none', 
    outline: 'none', 
    top: '8px',
    left: '12px',
    position: 'relative', 
    paddingLeft: '12px', 
    paddingRight: '12px', 
    fontFamily: 'inherit'
  }
}