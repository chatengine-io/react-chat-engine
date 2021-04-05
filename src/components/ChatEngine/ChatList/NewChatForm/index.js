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
    <div style={styles.newChatContainer} className='ce-chat-form-container'>
      <form onSubmit={handleSubmit.bind(this)} className='ce-chat-form'>
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
    </div>
  )
}

export default NewChatForm

const styles = {
  newChatContainer: { 
    padding: '18px 2px',
    backgroundColor: 'white'
  }
}