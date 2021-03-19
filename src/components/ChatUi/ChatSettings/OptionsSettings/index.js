import React, { useState } from 'react'

import { Button, deleteChat } from 'react-chat-engine'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

const OptionsSettings = props => {
    const [state, setState] = useState({
        collapsed: true,
        hovered: false
    })

    const { chats, activeChat } = props

    if (!chats || !activeChat || !chats[activeChat]) { return <div /> }

    const chat = chats[activeChat]

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <div 
                onMouseEnter={() => setState({ ...state, hovered: true })}
                onMouseLeave={() => setState({ ...state, hovered: false })}
                onClick={() => setState({ ...state, collapsed: !state.collapsed })}
                style={state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
            >
                <div style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                    Options
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

                    <Button 
                        value="Delete" 
                        theme='danger'
                        icon='delete'
                        onClick={() => deleteChat(props, chat.id, (data) => {})}
                        style={{ width: '100%', marginBottom: '12px' }}
                    />
                </div>
            }
        </div>
    )
}

export default OptionsSettings

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}
