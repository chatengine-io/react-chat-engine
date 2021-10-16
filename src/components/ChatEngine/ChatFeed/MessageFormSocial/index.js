import React, { useContext, useState } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import { sendMessage, isTyping } from 'react-chat-engine'

import FilesRow from '../NewMessageForm/FilesRow'
import ImagesRow from '../NewMessageForm/ImagesRow'

import ImagesInput from './ImagesInput'
import MessageInput from './MessageInput'

const MessageFormSocial = () => {
  const { conn, activeChat, messages, setMessages } = useContext(ChatEngineContext)

  const [iter, setIter] = useState(0) // Forces attachments update
  const [value, setValue] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [attachments, setAttachments] = useState([])

  if (!conn || conn === null) return <div />

  function onRemove(index) {
    const newAttachments = attachments
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
    setIter(iter + 1)
  }
  
  function handleChange(e) {
    setValue(e.target.value)
    setTrigger((trigger + 1) % 4)
    if (trigger === 1) { conn && isTyping(conn, activeChat) }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!conn) return 

    let text = value.trim()
    if (text.length > 11 && text.slice(-11) === '<p><br></p>') { text = text.substr(0, text.length - 11) }

    const custom_json = { sender_id: Date.now().toString() }
    const sender_username = conn.userName ? conn.userName : conn.senderUsername
    const created = new Date().toISOString().replace('T', ' ').replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`)
    const data = { text, attachments, custom_json, sender_username, chat: activeChat, created }

    if (text.length > 0 || attachments.length > 0) {
      sendMessage(conn, activeChat, data, () => {})
    }

    setValue('')
    setAttachments([])

    let newMessages = {...messages}
    newMessages[data.created] = data
    setMessages(newMessages)
  }

  return (
    <div 
      id='ce-social-msg-form-container'
      style={styles.messageFormContainer}
      className='ce-social-message-form-container'
    >
      <ImagesRow files={attachments} onRemove={(i) => onRemove(i)} />

      <FilesRow files={attachments} onRemove={(i) => onRemove(i)} />

      <form 
        onSubmit={handleSubmit.bind(this)} 
        className='ce-social-message-form' 
        style={styles.messageForm}
      >
        <button 
            icon='send'
            type="submit"
            id='ce-send-message-button'
            style={styles.sendMessage}
          >
            <img 
              className="send-icon" 
              style={styles.sendIcon}
              src="https://chat-engine-assets.s3.amazonaws.com/send.png" 
              alt="chat-engine-send-button"
            />
        </button>
      
        <div style={styles.inputContainer} className='ce-message-input-form'>
          <ImagesInput onSelectFiles={(attachments) => setAttachments(attachments)} />

          <MessageInput
            value={value}
            label='Send a message...'
            handleChange={handleChange.bind(this)}
            onSubmit={handleSubmit.bind(this)}
          />
        </div>
      </form>
    </div>
  );
}

export default MessageFormSocial

const styles = {
  messageFormContainer: { 
    position: 'absolute', 
    bottom: '0px', 
    width: '100%', 
    backgroundColor: 'white',
  },
  messageForm: {
    paddingTop: "22px",
    marginRight: "10px",
    width: '100%',
  },
  inputContainer: { 
    minHeight: '36px',
    paddingBottom: '16px',
    width: '100%'
  },
  sendMessage: {
    // Look + Feel
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    borderWidth: "0px",
    padding: "0px",
    outline: "none",
    color: "white",
    backgroundColor: 'rgb(24, 144, 255)',
    cursor: "pointer",
    // Positioning
    position: 'absolute',
    bottom: '12px',
    right: '10px',
    zIndex: '10'
  },
  sendIcon: {
    width: "20px",
    transform: "rotate(-20deg)",
    marginLeft: "5px",
  }
}