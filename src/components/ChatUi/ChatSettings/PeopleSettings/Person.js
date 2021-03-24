import React, { useState } from 'react'

import { removePerson } from 'react-chat-engine'

import { Avatar, Button } from 'react-chat-engine'

const Person = props => {
    const [selected, setSelected] = useState(false)

    function onRemovePerson() {
        removePerson(
            props.conn,
            props.chat.id,
            props.person.username
        )
    }

    function renderPersonText(person) {
        if (person.first_name !== null) {
            return `${person.first_name}${person.last_name ? ` ${person.last_name}` : ''}`
        } else {
            return person.username
        }
    }

    const { person, chat, conn } = props

    if (!person || !chat) { return <div /> }

    const { admin } = chat

    return (
        <div 
            className='ce-person-container'
            onMouseEnter={() => setSelected(true)}
            onMouseLeave={() => setSelected(false)}
        >
            <div 
                className='ce-person-avatar'
                style={{ padding: '2px', height: '0px' }}
            >
                <Avatar 
                    avatar={person.avatar} 
                    username={person.username} 
                    is_online={person.is_online}
                />
            </div>

            <div
                className='ce-person-text'
                style={{ paddingLeft: '52px', height: '44px', position: 'relative', top: '10px', fontSize: '15px' }}
            >
                { renderPersonText(person) }
            </div>

            {
                selected && (conn.userName === admin.username) && (person.username !== admin.username) &&
                <div
                    className='ce-delete-chat' 
                    style={{ float: 'right', height: '0px', position: 'relative', bottom: '44px'}}
                >
                    <Button 
                        theme='danger'
                        icon='delete'
                        onClick={() => onRemovePerson()}
                    />
                </div>
            }
        </div>
    )
}

export default Person
