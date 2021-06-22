import React from 'react'

const CreateChat = () => {
    return (
        <div
            id='ce-ice-breaker' 
            style={{ width: '100%', textAlign: 'center', paddingTop: 'calc(43% - 112px)' }}
        >
            <div 
                id='ce-ice-breaker-text' 
                style={{ color: '#afafaf', fontWeight: '600', marginBottom: '6px' }}
            >
                Welcome!
            </div>
            <div 
                id='ce-ice-breaker-text' 
                style={{ color: '#afafaf' }}
            >
                Create a new chat to get started.
            </div>

            <img
                id='ce-ice-breaker-gif' 
                style={{ width: '50%', maxWidth: '200px' }}
                src='https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/okay.gif'
                alt='chat-engine-ice-breaker'
            />
        </div>   
    )
}

export default CreateChat
