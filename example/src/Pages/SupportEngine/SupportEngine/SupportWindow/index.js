import React, { useState } from "react";

import EmailForm from './EmailForm'
import ChatEngine from "./ChatEngine";

const SupportWindow = props => {
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)

    return (
        <div style={{
            ...styles.supportWindow,
            ...{ opacity: props.visible ? '1' : '0' }
        }}>
            <EmailForm 
                visible={user === null || chat === null}
                setUser={user => setUser(user)} 
                setChat={chat => setChat(chat)} 
            />

            <ChatEngine 
                visible={user !== null && chat !== null}
                user={user} 
                chat={chat} 
            />
        </div>
    )
}

export default SupportWindow;

const styles = {
    supportWindow: {
        // Position
        position: 'fixed',
        bottom: '116px',
        right: '24px',
        // Size
        width: '420px',
        height: '530px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        backgroundColor: 'white',
        // Border
        borderRadius: '12px',
        border: `2px solid #7a39e0`,
        overflow: 'hidden',
        // Transition
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
        // Shadow
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
    }
}
