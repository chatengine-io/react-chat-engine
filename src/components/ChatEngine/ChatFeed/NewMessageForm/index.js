import React, { useContext, useState } from 'react'

import { sendMessage, isTyping, ChatEngineContext } from 'react-chat-engine'

import FilesRow from './FilesRow'
import ImagesRow from './ImagesRow'

import NextQuill from './NextQuill'

const NewMessageForm = () => {
  const { 
    conn, 
    activeChat, 
    messages, 
    setMessages 
  } = useContext(ChatEngineContext)
  
  const [iter, setIter] = useState(0) // Forces attachments update
  const [value, setValue] = useState('')
  const [trigger, setTrigger] = useState(0)
  const [attachments, setAttachments] = useState([])

  function onRemove(index) {
    const newAttachments = attachments
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
    setIter(iter + 1)
  }
  
  function handleChange(value) {
    setValue(value)
    setTrigger((trigger + 1) % 4)
    if (trigger === 1) { conn && isTyping(conn, activeChat) }
  }
  
  function handleSubmit() {
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
      id='msg-form-container'
      style={styles.NewMessageFormContainer}
      className='ce-message-form-container'
    >
      <ImagesRow files={attachments} onRemove={(i) => onRemove(i)} />

      <FilesRow files={attachments} onRemove={(i) => onRemove(i)} />

      <NextQuill
        theme='snow'
        value={value}
        onChange={handleChange.bind(this)}
        onSubmit={handleSubmit.bind(this)}
        onAttach={setAttachments.bind(this)}
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
}