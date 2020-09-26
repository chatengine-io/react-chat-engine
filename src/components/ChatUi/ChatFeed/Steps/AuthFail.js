import React, { Component } from 'react'

import { Row } from 'antd'

export default class AuthFail extends Component {
    render() {
        return (
            <div style={{ height: '100vh', textAlign: 'center' }}>
                <Row>
                    <img
                        style={{ width: '40%', paddingTop: '25vh' }}
                        src='https://chat-engine-assets.s3.amazonaws.com/denied.svg'
                        alt='welcome-to-chat-engine'
                    />
                </Row>
                <Row style={{ fontSize: '18px', paddingTop: '24px', width: '75%', paddingLeft: '12.5%' }}>
                    Your credentials are incorrect. Make sure your Public Key, Username, and Password are correct at <a href='https://chatengine.io'>chatengine.io</a>
                </Row>
            </div>
        )
    }
}
