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
                <div 
                    className='ce-chat-card-loading-bar'
                    style={{ 
                        ...styles.loadingBar,
                        ...{ marginBottom: '8px', height: '16px', width: '100%' }
                    }} 
                />
            </div>

            <div style={{ width: '100%' }} className='ce-chat-subtitle'>
                <div style={styles.messageText} className='ce-chat-subtitle-text ce-chat-subtitle-message'>
                    <div 
                        className='ce-chat-card-loading-bar'
                        style={{ 
                            ...styles.loadingBar,
                            ...{ width: '45%' }
                        }} 
                    />
                </div>

                <div 
                    className='ce-chat-card-loading-bar'
                    style={{ 
                        ...styles.loadingBar,
                        ...{ float: 'right', marginTop: '6px', width: '20%' }
                    }} 
                />
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
    loadingBar: {
        borderRadius: '4px',
        backgroundColor: '#e2e2e2', 
        height: '12px', 
        display: 'inline-block'
    }
}

export default ChatCard;
