import React from 'react'

const Welcome = () => {
    return (
        <div style={{ height: '100%', textAlign: 'center' }}>

            <div style={{ width: '100%' }}>                    
                <img
                    style={{ width: '60%', paddingTop: '33vh' }}
                    src='https://chat-engine-assets.s3.amazonaws.com/welcome.svg'
                    alt='welcome-to-chat-engine'
                />
            </div>

            <div style={{ fontSize: '18px', paddingTop: '24px', width: '75%', paddingLeft: '12.5%' }}>
                Fill out the "New Chat" form to get started.
            </div>

        </div>
    )
}

export default Welcome
