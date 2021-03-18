import React, { useState } from 'react'

import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

import ChatList from '../../ChatList'

const ChatListDrawer = props => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div> 
            <MenuOutlined
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
                            My Chats
                        </div>
                    </div>

                    <ChatList 
                        {...props} 
                        onChatClick={(chatId) => {
                            props.onChatClick && props.onChatClick(chatId)
                            setIsOpen(false)
                        }}
                    />
                </div>
            }
        </div>
    )
}

export default ChatListDrawer

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
    }
}
