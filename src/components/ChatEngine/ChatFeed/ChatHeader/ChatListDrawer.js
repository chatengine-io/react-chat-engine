import React, { useState, useContext } from 'react'

import { MenuOutlined } from '@ant-design/icons'

import { ChatEngineContext } from '../../../Context'

import ChatList from '../../ChatList'

const ChatListDrawer = props => {
    const [isOpen, setIsOpen] = useState(false)
    const context = useContext(ChatEngineContext)
    const propsAndContext = {...props, ...context}

    return (
        <div> 
            <MenuOutlined
                onClick={() => setIsOpen(true)}
                style={{ color: 'rgb(24, 144, 255)', outline: 'none' }} 
            />

            { 
                isOpen &&
                <div style={styles.drawerContainer}>
                    <ChatList 
                        {...propsAndContext} 
                        onClose={() => setIsOpen(false)} 
                        onChatClick={() => setIsOpen(false)} 
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
