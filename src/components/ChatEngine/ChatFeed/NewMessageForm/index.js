import React, { useContext, useState } from 'react'

import { ChatEngineContext } from '../../../Context'

import { sendMessage, isTyping } from 'react-chat-engine'

import FilesRow from './FilesRow'
import ImagesInput from './ImagesInput'
import SendButton from './SendButton'

const ReactQuill = require('react-quill');
require('react-quill/dist/quill.snow.css');

const NewMessageForm = () => {
  const { 
    conn, 
    activeChat, 
    sendingMessages, 
    setSendingMessages 
  } = useContext(ChatEngineContext)
  
  const [value, setValue] = useState(0)
  const [trigger, setTrigger] = useState(0)
  const [attachments, setAttachments] = useState([])

  const modules = {
    toolbar: {
      container: "#toolbar",
    }
  }
  
  const formats = [
    'bold', 'italic', 'underline', 'strike', 'code',
    'list', 'bullet', 'indent',
    'link', 'code',
  ]

  if (!conn || conn === null) return <div />

  function onRemove(index) {
    const newAttachments = attachments
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }
  
  function handleChange(value) {
    setValue(value)
    setTrigger((trigger + 1) % 4)
    if (trigger === 1) { isTyping(conn, activeChat) }
  }
  
  function handleSubmit() {
    let text = value.trim()
    if (text.slice(-11) === '<p><br></p>') { text = text.substr(0, text.length - 11) }

    const custom_json = { sender_id: Date.now().toString() }
    const sender_username = conn.userName ? conn.userName : conn.senderUsername
    const data = { text, attachments, custom_json, sender_username, chat: activeChat }

    if (text.length > 0 || attachments.length > 0) {
      sendMessage(conn, activeChat, data, () => {})
    }

    setValue('')
    setAttachments([])

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
      <FilesRow files={attachments} onRemove={(i) => onRemove(i)} />

      <ReactQuill
        theme='snow'
        value={value}
        modules={modules}
        formats={formats}
        onChange={handleChange.bind(this)}
        onKeyDown={(e) => { if (e.keyCode === 13) { handleSubmit() } }}
      />

      <div id="toolbar">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>

        <button className="ql-code"></button>
        <button className="ql-link"></button>
        <ImagesInput onSelectFiles={(attachments) => setAttachments(attachments)} />

        <div style={{ position: 'absolute', right: '5px', bottom: '36px' }} onClick={handleSubmit.bind(this)}>
          <SendButton />
        </div>
      </div>
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