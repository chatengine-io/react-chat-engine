import React from 'react';

import { sendMessage, isTyping } from 'react-chat-engine'

import FileRow from './FileRow'
import ImagesInput from './ImagesInput'

import { Button, TextAreaInput } from 'react-chat-engine'
export default class MessageForm extends React.Component {
    state = {
      trigger: 0,
      mod: 3,
      value: '',
      files: []
    }

    onRemove(index) {
      let { files } = this.state 
      files.splice(index, 1)
      this.setState({ files })
    }
  
    handleChange(event) {
      this.setState({
        value: event.target.value,
        trigger: (this.state.trigger + 1) % this.state.mod
      });
      
      if (this.state.trigger === 1) {
        isTyping(this.props, this.props.chatId)
      }
    }

    uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const { files } = this.state
      const text = this.state.value.trim()
      const custom_json = { sender_id: this.uuid() }
      const data = { text, files, custom_json }

      if (text.length > 0 || files.length > 0) {
        sendMessage(
          this.props, 
          this.props.chatId, 
          data,
          (data) => {}
        )
      }

      this.props.sendingMessage && this.props.sendingMessage(data)

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