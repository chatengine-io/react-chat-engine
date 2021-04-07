import React, { useState, useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import { newChat } from 'react-chat-engine'

import { Button, TextInput } from 'react-chat-engine'

const NewChatForm = () => {
  const { conn } = useContext(ChatEngineContext)
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(false)
  
  function handleChange(event) {
    setValue(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (value.trim().length > 0) {
      newChat(
        conn, 
        { title: value },
        () => setSelected(false)
      )
    }

    setValue('')
  }

  return (
    <div style={styles.newChatContainer} className='ce-chat-form-container'>
      
        {
          selected ?
          <form onSubmit={handleSubmit.bind(this)}> 
              <TextInput 
                autoFocus
                label='Chat Title'
                value={value}
                id='ce-new-chat-title-field'
                onBlur={() => setSelected(false)}
                style={{ width: '100%' }}
                handleChange={(e) => handleChange(e)}
              />
          </form>:
          <div>
            <div style={{ height: '0px' }}>
              <div style={{ fontWeight: '600', fontSize: '24px', position: 'relative', top: '4px', width:' calc(100% - 48px)' }}>
                My Chats
              </div>
            </div>

            <div style={{ width: '100%', textAlign: 'right' }}>
              <Button 
                icon='plus'
                onClick={() => setSelected(true)}
              />
            </div>
          </div>

        }
    </div>
  )
}

export default NewChatForm

const styles = {
  newChatContainer: { 
    padding: '16px 14px',
    backgroundColor: 'white'
  }
}