import React, { Component } from 'react'

export default class Welcome extends Component {
    render() {
        return (
            <div style={{ height: '100vh', textAlign: 'center' }}>

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
}
