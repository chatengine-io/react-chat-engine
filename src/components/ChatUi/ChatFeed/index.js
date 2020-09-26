import React, { Component } from 'react'

import { Row } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import Message from './Message'
import MessageForm from './MessageForm'

import _ from 'lodash'

export default class ChatList extends Component {

    renderMessages(messages) {
        return _.map(messages, (message, index) => {
            return <Message key={`message_${index}`} message={message} creds={this.props.creds} chatId={this.props.chatId} />            
        })
    }

    render() {
        const { messages, chats, creds } = this.props

        if(creds === null) { 
            return <LoadingOutlined 
                className='vertical-center' 
                style={{ 
                    width: '100%', 
                    position: 'relative', 
                    top: 'calc(50vh - 26px)', 
                    textAlign: 'center',
                    fontSize: '52px'
                }} 
            />
        }

        else if(creds === undefined) {
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

        else if(creds && chats === {}) {
            return (
                <div style={{ height: '100vh', textAlign: 'center' }}>
                    <Row>
                        <img
                            style={{ width: '60%', paddingTop: '33vh' }}
                            src='https://chat-engine-assets.s3.amazonaws.com/welcome.svg'
                            alt='welcome-to-chat-engine'
                        />
                    </Row>
                    <Row style={{ fontSize: '18px', paddingTop: '24px', width: '75%', paddingLeft: '12.5%' }}>
                        Fill out the "New Chat" form to get started.
                    </Row>
                </div>
            )
        }

        return (
            <div style={{ height: '100vh' }}>

                { this.renderMessages(messages) }

                <MessageForm chatId={this.props.chatId} creds={this.props.creds} />

            </div>
        )
    }
}
