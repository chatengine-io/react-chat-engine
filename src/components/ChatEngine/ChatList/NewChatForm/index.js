import React, { useState, useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import { newChat } from 'react-chat-engine'

import { Button, TextInput } from 'react-chat-engine'

const NewChatForm = () => {
  const { conn } = useContext(ChatEngineContext)
  const [value, setValue] = useState('')
  
  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (value.trim().length > 0) {
      newChat(
        conn, 
        { title: value },
        () => {}
      )
    }

    setValue('')
  }

  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <div style={{ height: '1px' }}>
        <TextInput 
          label='New Chat'
          value={value}
          style={{ width: 'calc(100% - 48px)' }}
          handleChange={(e) => handleChange(e)}
        />
      </div>

      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button 
          icon='plus'
          type="submit" 
        />
      </div>
    </form>
  )
}

export default NewChatForm