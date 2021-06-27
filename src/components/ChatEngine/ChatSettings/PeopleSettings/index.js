import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import PersonRow from './PersonRow'
import PersonForm from './PersonForm'

import SettingsBlock from '../SettingsBlock'

const PeopleSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 

    if (!chat || chat.is_direct_chat) { return <div /> }

    function renderChatPeople(people, chat) {
        return people.map((chatPerson, index) => {
            return (
                <PersonRow 
                    key={`person_${index}`} 
                    person={chatPerson.person}
                    conn={conn} 
                    chat={chat} 
                />
            )
        })
    }    

    return (
        <div 
            style={{ borderTop: '1px solid #f0f0f0' }}
        >
            <SettingsBlock
                label='People'
                className='ce-section-title-container ce-person-title-container'
            >
                <div>
                    <div style={{ height: '12px' }} />

                    { renderChatPeople(chat.people, chat) }

                    <div style={{ height: '12px' }} />

                    {
                        conn && chat && conn.userName === chat.admin.username &&
                        <PersonForm conn={conn} chat={chat} />
                    }
                </div>
            </SettingsBlock>
        </div>
    )
}

export default PeopleSettings
