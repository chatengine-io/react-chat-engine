import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

const IceBreaker = () => {
    const { activeChat }= useContext(ChatEngineContext)
    const gifs = [
        'https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/peace.gif',
        'https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/thumbsup.gif',
    ]
    const gif = gifs[(activeChat ? activeChat : 0) % gifs.length]

    return (
        <div
            id='ce-ice-breaker' 
            style={{ width: '100%', textAlign: 'center', paddingTop: 'calc(43% - 112px)' }}
        >
            <div 
                id='ce-ice-breaker-text' 
                style={{ color: '#afafaf', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}
            >
                No messages here yet...
            </div>

            <img
                id='ce-ice-breaker-gif' 
                style={{ width: '50%', maxWidth: '200px' }}
                src={gif}
                alt='chat-engine-ice-breaker'
            />
        </div>   
    )
}

export default IceBreaker
