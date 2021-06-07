import React from 'react'

const ChatCard = () => {
    return (
        <div 
            style={styles.chatContainer}
            className='ce-chat-card ce-chat-card-loading'
        >
            <div 
                style={{...styles.titleText, ...{ animation: `spin 2s linear infinite` }}}
                className='ce-chat-title-text'
                id={`ce-chat-card-title-loading`}
            >
                <div style={{ backgroundColor: '#e2e2e2', height: '16px', marginBottom: '8px', width: '100%', borderRadius: '4px' }} />
            </div>

            <div style={{ width: '100%' }} className='ce-chat-subtitle'>
                <div style={styles.messageText} className='ce-chat-subtitle-text ce-chat-subtitle-message'>
                    <div style={{ backgroundColor: '#e2e2e2', height: '12px', width: '45%', borderRadius: '4px', display: 'inline-block' }} />
                </div>

                <div style={{ float: 'right', backgroundColor: '#e2e2e2', marginTop: '2px', height: '12px', width: '20%', borderRadius: '4px', display: 'inline-block' }} />
            </div>
        </div>
    )
}

const styles={
    chatContainer: { 
        padding: '16px', 
        paddingBottom: '12px',
        cursor: 'pointer'
    },
    titleText: { 
        fontWeight: '500',
        paddingBottom: '4px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden' 
    },
    messageText: {
        width: '75%',
        color: 'rgba(153, 153, 153, 1)', 
        fontSize: '14px', 
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        display: 'inline-block'
    },
    activeChat: {
        backgroundColor: '#d9d9d9',
        border: '4px solid white',
        borderRadius: '12px'
    },
}

export default ChatCard;
