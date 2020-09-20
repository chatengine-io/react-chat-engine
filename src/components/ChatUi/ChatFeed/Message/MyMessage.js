import React, { Component } from 'react'

import MessageEditForm from '../MessageForm/edit'

import { Button } from '../../components/Button'

import { deleteMessage } from 'react-chat-engine'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

export default class Message extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, message, chatId } = this.props

        if (!message) { return <div /> }

        return (
            <div 
                style={{ width: '100%', float: 'right', paddingBottom: '12px'  }}
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >

                <Row style={{ paddingRight: '2px' }}>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        <div style={styles.myMessage}>
                            { message.text }
                        </div>

                    </Col>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        {
                            this.state.selected &&
                            <div style={{ width: '100%', height: '44px' }}>

                                <div style={{ width: 'calc(100% - 46px)' }}>
                                    <MessageEditForm creds={creds} chatId={chatId} message={message} />
                                </div>

                                <Button
                                    theme='danger'
                                    icon='delete'
                                    style={{ float: 'right', position: 'relative', bottom: '37px' }}
                                    onClick={() => deleteMessage(creds, chatId, message.id)} 
                                />

                            </div>
                        }

                    </Col>
            
                </Row>
                
            </div>
        )
    }
}

const styles = {
    myMessage: {
        color: 'white', 
        cursor: 'pointer',
        float: 'right',
        padding: '12px',
        borderRadius: '1.3em',
        backgroundColor: 'rgb(24, 144, 255)', 
    }
}