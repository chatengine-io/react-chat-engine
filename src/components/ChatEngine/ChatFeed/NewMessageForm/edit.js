import React, { useState } from 'react';

import { editMessage } from 'react-chat-engine'

import { Button, TextInput } from 'react-chat-engine'

const MessageEditForm = props => {
  const [value, setValue] = useState('')
  
  function handleChange(event) {
    setValue(event.target.value);
  }
  
  function handleSubmit(event) {
      event.preventDefault();
      
      editMessage(
          props.conn, 
          props.chatId, 
          props.message.id,
          { text: value },
          (data) => {}
      )
  }

  return (
    <form onSubmit={handleSubmit.bind(this)}>
      <TextInput 
        type="text" 
        label='Edit message...'
        value={value} 
        style={{ width: 'calc(100% - 84px)' }}
        handleChange={handleChange.bind(this)} 
      />
      
      <Button type="submit" value="Edit" />
    </form>
  );
}

export default MessageEditForm