import React, { useState, useEffect, useRef } from 'react';

import { editChat, TextInput } from 'react-chat-engine'

const NewMessageForm = props => {
    const didMountRef = useRef(false)
    const [state, setState] = useState({
        activeChat: null,
        value: ''
    })
  
    function handleChange(event) {
        setState({ ...state, value: event.target.value });
    }
  
    function handleSubmit(event) {
        event.preventDefault();

        editChat(
            props.conn, 
            props.chat.id,
            {title: state.value},
            (data) => {}
        )
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

        } else {
            if(state.activeChat !== props.chat.id) {
                setState({ 
                    ...state,
                    value: props.chat.title,
                    activeChat: props.chat.id
                })
            }
        }
    })

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='ce-chat-title-form'>
            <TextInput 
                label="Rename this Chat" 
                value={state.value} 
                default={props.chat.title}
                handleChange={(e) => handleChange(e)} 
                style={{ 
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    border: '0px solid white',
                    width: '100%',
                }}
            />
        </form>
    );
}

export default NewMessageForm