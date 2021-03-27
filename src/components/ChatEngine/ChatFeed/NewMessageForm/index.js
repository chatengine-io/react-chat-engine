import React, { useContext, useState } from 'react'

import { ChatEngineContext } from '../../../Context'

import { sendMessage, isTyping } from 'react-chat-engine'

import FileRow from './FileRow'
import ImagesInput from './ImagesInput'

import { Button, TextAreaInput } from 'react-chat-engine'

const NewMessageForm = () => {
  const { conn, activeChat, sendingMessages, setSendingMessages } = useContext(ChatEngineContext)

  const [state, setState] = useState({
    trigger: 0,
    mod: 3,
    value: '',
    attachments: []
  })

  function onRemove(index) {
    let { attachments } = state 
    attachments.splice(index, 1)
    setState({ ...state, attachments })
  }
  
  function handleChange(event) {
    setState({
      ...state,
      value: event.target.value,
      trigger: (state.trigger + 1) % state.mod
    });
    
    if (state.trigger === 1) {
      isTyping(conn, activeChat)
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault();

    const { attachments } = state
    const text = state.value.trim()
    const sender_username = conn.userName
    const custom_json = { sender_id: Date.now().toString() }
    const data = { text, attachments, custom_json, sender_username, chat: activeChat }

    if (text.length > 0 || attachments.length > 0) {
      sendMessage(
        conn, 
        activeChat, 
        data,
        (data) => {}
      )
    }

    setState({ ...state, value: '', attachments: [] })

    let newSendingMessages = {...sendingMessages}
    newSendingMessages[data.custom_json.sender_id] = data
    setSendingMessages(newSendingMessages)
  }

  return (
    <div 
      id='msg-form-container'
      style={styles.NewMessageFormContainer}
      className='ce-message-form-container'
    >
      <FileRow files={state.attachments} onRemove={(i) => onRemove(i)} />

      <ImagesInput onSelectFiles={(attachments) => setState({ ...state, attachments })} />

      <form onSubmit={handleSubmit.bind(this)} className='ce-message-form'>
        <div style={styles.inputContainer} className='ce-message-input-form'>
          <TextAreaInput
            value={state.value}
            label='Send a message...'
            handleChange={handleChange.bind(this)}
            onSubmit={handleSubmit.bind(this)}
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

export default NewMessageForm

const styles = {
  NewMessageFormContainer: { 
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