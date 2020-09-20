import React, { Component } from 'react'

import MessageEditForm from '../MessageForm/edit'

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
            <div style={{ width: '100%', float: 'right', paddingBottom: '12px'  }}>

                <Row style={{ paddingRight: '2px' }}>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        <div 
                            onMouseEnter={() => this.setState({ selected: true })}
                            onMouseLeave={() => this.setState({ selected: false })}
                        >

                            <div style={styles.myMessage}>
                                { message.text }
                            </div>

                            {
                                this.state.selected &&
                                <div>

                                    <MessageEditForm creds={creds} chatId={chatId} message={message} />

                                    <button onClick={() => deleteMessage(creds, chatId, message.id)}>Delete</button>

                                </div>
                            }

                        </div>

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
        borderRadius: '6px',
        backgroundColor: 'rgb(24, 144, 255)', 
    }
}