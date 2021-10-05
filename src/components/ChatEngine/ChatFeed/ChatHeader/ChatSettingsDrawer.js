import React, { useState, useContext } from 'react'

import { SettingOutlined, CloseOutlined } from '@ant-design/icons'

import { ChatEngineContext } from 'react-chat-engine'

import ChatSettings from '../../ChatSettings'

const ChatSettingsDrawer = props => {
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(ChatEngineContext)
    const allProps = {...props, ...context.conn}

    return (
        <div> 
            <SettingOutlined
                onClick={() => setIsOpen(true)}
                style={{ color: 'rgb(24, 144, 255)', outline: 'none' }} 
            />

            { 
                isOpen &&
                <div style={styles.drawerContainer}>
                    <CloseOutlined
                        style={styles.closeIcon}
                        onClick={() => setIsOpen(false)}
                    />

                    <div style={styles.titleContainer}>
                        <div style={styles.titleText}>
                            Chat Settings
                        </div>
                    </div>

                    {
                        context.conn !== null && context.conn.renderChatSettings ?
                        context.conn.renderChatSettings(context) :
                        <ChatSettings {...allProps} />
                    }
                </div>
            }
        </div>
    );
}

export default ChatSettingsDrawer

const styles = {
    drawerContainer: { 
        position: 'fixed',
        zIndex: '1',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        textAlign: 'left'
    },
    closeIcon: {
        position: 'absolute',
        left: '28px',
        top: '32px'
    },
    titleContainer: {
        width: '100%',
        padding: '24px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
}
