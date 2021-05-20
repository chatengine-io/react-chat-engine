import React, { useContext, useState } from 'react'

import { ChatEngineContext } from '../../../Context'

import { sendMessage, isTyping } from 'react-chat-engine'

import FileRow from './FileRow'
import ImagesInput from './ImagesInput'

import { Button } from 'react-chat-engine'

const ReactQuill = require('react-quill');
require('react-quill/dist/quill.snow.css');

const NewMessageForm = () => {
  const { conn, activeChat, sendingMessages, setSendingMessages } = useContext(ChatEngineContext)
  const [state, setState] = useState({
    trigger: 0,
    mod: 3,
    value: '',
    attachments: []
  })

  const modules = {
    toolbar: {
      container: "#toolbar",
      // handlers: {
      //   "insertStar": insertStar,
      // }
    }
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'code',
    'list', 'bullet', 'indent',
    'link',
  ]

  if (!conn || conn === null) return <div />

  function onRemove(index) {
    let { attachments } = state 
    attachments.splice(index, 1)
    setState({ ...state, attachments })
  }
  
  function handleChange(value) {
    console.log('value', value)
    setState({
      ...state,
      value,
      trigger: (state.trigger + 1) % state.mod
    });
    
    if (state.trigger === 1) {
      isTyping(conn, activeChat)
    }
  }
  
  function handleSubmit() {
    const { attachments } = state
    const text = state.value.trim()
    const custom_json = { sender_id: Date.now().toString() }
    const sender_username = conn.userName ? conn.userName : conn.senderUsername
    const data = { text, attachments, custom_json, sender_username, chat: activeChat }

    if (text.length > 0 || attachments.length > 0) {
      sendMessage(conn, activeChat, data, (data) => {})
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

      <div id="toolbar">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <ImagesInput 
          
          onSelectFiles={(attachments) => setState({ ...state, attachments })} 
        />
        <Button onClick={handleSubmit.bind(this)} style={{ position: 'relative', left: '55px' }} />
      </div>

      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        onChange={handleChange.bind(this)}
      />
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