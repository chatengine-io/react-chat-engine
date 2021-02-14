import React from 'react';

import { sendMessage, isTyping } from 'react-chat-engine'

import FileRow from './FileRow'
import ImagesInput from './ImagesInput'

import { Button, TextAreaInput } from 'react-chat-engine'
export default class MessageForm extends React.Component {
    state = {
      value: '',
      files: []
    }

    onRemove(index) {
      let { files } = this.state 
      files.splice(index, 1)
      this.setState({ files })
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});

      isTyping(this.props.creds, this.props.chatId)
    }
  
    handleSubmit(event) {
      event.preventDefault();

      const { files } = this.state
      const text = this.state.value.trim()

      if (text.length > 0 || files.length > 0) {
        sendMessage(
          this.props.creds, 
          this.props.chatId, 
          { text, files },
          (data) => {}
        )
      }

      this.setState({ value: '', files: [] })
    }
  
    render() {
      return (
        <div 
          id='msg-form-container'
          style={styles.messageFormContainer}
          className='ce-message-form-container'
        >
          <FileRow files={this.state.files} onRemove={(i) => this.onRemove(i)} />

          <ImagesInput onSelectFiles={(files) => this.setState({ files })} />

          <form onSubmit={this.handleSubmit.bind(this)} className='ce-message-form'>
            <div style={styles.inputContainer} className='ce-message-input-form'>
              <TextAreaInput
                value={this.state.value}
                label='Send a message...'
                handleChange={this.handleChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />

              <Button 
                icon='send'
                type="submit"
                style={{ position: 'absolute', bottom: '10px', right: '6px' }}
              />
            </div>
          </form>
        </div>
      );
    }
}

const styles = {
  messageFormContainer: { 
    position: 'absolute', 
    bottom: '0px', 
    width: '100%', 
    backgroundColor: 'white',
  },
  inputContainer: { 
    minHeight: '36px',
    paddingTop: '10px',
    paddingBottom: '6px',
  },
}