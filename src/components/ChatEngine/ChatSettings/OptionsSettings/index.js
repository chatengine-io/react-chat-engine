import React, { useState, useContext } from 'react'

import { Button, deleteChat, ChatEngineContext } from 'react-chat-engine'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

const OptionsSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 
    const [state, setState] = useState({
        collapsed: true,
        hovered: false
    })

    if (!chat) return <div />

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <div 
                id='ce-options-drop-down'
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
                        id='ce-delete-chat-button'
                        onClick={() => deleteChat(conn, chat.id, (data) => {})}
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
