import React, { useContext } from 'react'

import { Button, deleteChat, ChatEngineContext } from 'react-chat-engine'

import SettingsBlock from '../SettingsBlock'

const OptionsSettings = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 

    if (!chat) return <div />

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <SettingsBlock 
                id='ce-options-drop-down'
                label='Options'
            >
                <div>
                    <div style={{ height: '8px' }} />

                    <Button 
                        value="Delete" 
                        theme='danger'
                        icon='delete'
                        id='ce-delete-chat-button'
                        onClick={() => deleteChat(conn, chat.id, (data) => {})}
                        style={{ width: '100%', marginBottom: '12px' }}
                    />
                </div>
            </SettingsBlock>
        </div>
    )
}

export default OptionsSettings
