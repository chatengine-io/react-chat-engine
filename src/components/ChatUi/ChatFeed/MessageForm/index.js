import React from 'react';

import { sendMessage } from 'react-chat-engine'

import FileRow from './FileRow'
import ImagesInput from './ImagesInput'

import { Button } from '../../components/Button'
import { TextAreaInput } from '../../components/Input'

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
    }
  
    handleSubmit(event) {
      event.preventDefault();

      sendMessage(
        this.props.creds, 
        this.props.chatId, 
        { text: this.state.value, files: this.state.files },
        () => this.setState({ value: '', files: [] })
      )
    }

    renderFiles() {
      return this.state.files.map((file, index) => {
        return (
          <div key={`file_${index}`}>
            <img
              style={{ maxHeight: '66px', maxWidth: '66px' }}
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          </div>
        )
      })
    }
  
    render() {
      return (
        <div style={ styles.messageFormContainer } id='msg-form-container'>

          <FileRow files={this.state.files} onRemove={(i) => this.onRemove(i)} />

          <ImagesInput onSelectFiles={(files) => this.setState({ files })} /> 

          <form onSubmit={this.handleSubmit.bind(this)}>

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
                style={{ position: 'absolute', bottom: '5px', right: '4px' }} 
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
    backgroundColor: 'rgb(255, 255, 255, 0.92)',
  },
  inputContainer: { 
    overflow: 'hidden',
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