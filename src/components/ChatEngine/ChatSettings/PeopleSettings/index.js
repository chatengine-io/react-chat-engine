import React, { useState, useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import PersonRow from './PersonRow'
import PersonForm from './PersonForm'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

const PeopleSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 
    const [state, setState] = useState({
        collapsed: false,
        hovered: false
    })

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
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <div 
                onMouseEnter={() => setState({ ...state, hovered: true })}
                onMouseLeave={() => setState({ ...state, hovered: false })}
                onClick={() => setState({ ...state, collapsed: !state.collapsed })}
                style={state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
                className='ce-section-title-container ce-person-title-container'
            >
                <div
                    className='ce-section-title ce-people-title'
                    style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                    People
                </div>

                {
                    state.collapsed ?
                    <LeftOutlined style={styles.collapseIcon} /> :
                    <DownOutlined style={styles.collapseIcon} />
                }
            </div>

            {
                !state.collapsed &&
                <div>
                    <div style={{ height: '12px' }} />

                    { renderChatPeople(chat.people, chat) }

                    <div style={{ height: '12px' }} />

                    {
                        conn && chat && conn.userName === chat.admin.username &&
                        <PersonForm conn={conn} chat={chat} />
                    }
                </div>
            }
        </div>
    )
}

export default PeopleSettings

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}