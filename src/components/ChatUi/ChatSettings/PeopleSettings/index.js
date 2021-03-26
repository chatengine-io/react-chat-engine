import React, { useState } from 'react';

import Person from './Person'
import PersonForm from './PersonForm'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

const PeopleSettings = props => {
    const [state, setState] = useState({
        collapsed: false,
        hovered: false
    })
    const { chat } = props

    function renderChatPeople(people, chat) {
        return people.map((chatPerson, index) => {
            return (
                <Person 
                    key={`person_${index}`} 
                    person={chatPerson.person}
                    conn={props} 
                    chat={chat} 
                />
            )
        })
    }

    if (chat.is_direct_chat) { return <div /> }

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
                        props && chat && props.userName === chat.admin.username &&
                        <PersonForm conn={props} chat={chat} />
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