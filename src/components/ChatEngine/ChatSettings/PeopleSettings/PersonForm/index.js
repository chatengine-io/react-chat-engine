import React, { useState } from 'react';

import { addPerson, getOtherPeople } from 'react-chat-engine'

import { AutoCompleteInput } from 'react-chat-engine'

import Option from './Option'

const PersonForm = props => {
  const [state, setState] = useState({
    value: '',
    others: []
  })

  function handleChange(value) {
    setState({ ...state, value });
  }

  function invitePerson(name) {
    addPerson(
      props.conn,
      props.chat.id,
      name,
      () => { 
        setState({ ...state, value: '' }); 
        getOthers(); 
      }
    )
  }

  function getOthers() {
    getOtherPeople(
      props.conn,
      props.chat.id,
      (id, others) => setState({ ...state, others }),
      () => {},
    )
  }

  function renderOption(option) {
    return <Option person={option} onClick={() => invitePerson(option.username)} />
  }

  return (
    <div style={{ marginBottom: '12px' }}>
      <AutoCompleteInput 
        style={{ width: '100%' }}
        label='Type a username'
        value={state.value}
        options={state.others}
        onFocus={() => getOthers()}
        handleChange={(value) => handleChange(value)} 
        renderOption={(option) => renderOption(option)}
      />
    </div>
  )
}

export default PersonForm
