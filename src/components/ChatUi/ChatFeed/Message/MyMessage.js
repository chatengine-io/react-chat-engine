import React, { Component } from 'react'

import MessageEditForm from '../MessageForm/edit'

import Dot from '../../components/Avatar/Dot'
import { Button } from '../../components/Button'

import { deleteMessage } from 'react-chat-engine'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

export default class Message extends Component {
    state = {
        selected: false
    }

    renderReads(message) {
        return message.reads.map((read, index) => {
            return <Dot key={`read_${index}`} text={read.person} style={{ float: 'right' }} />
        })
    }

    render() {
        const { creds, chatId, lastMessage, message, nextMessage } = this.props

        if (!message) { return <div /> }

        const topRightRadius = !lastMessage || lastMessage.sender !== message.sender ? '1.3em' : '0.3em'
        const bottomRightRadius = !nextMessage || nextMessage.sender !== message.sender ? '1.3em' : '0.3em'

        const borderRadius = `1.3em ${topRightRadius} ${bottomRightRadius} 1.3em`
        const paddingBottom = !nextMessage || nextMessage.sender !== message.sender ? '12px' : '2px'

        return (
            <div 
                style={{ width: '100%', float: 'right', paddingBottom }}
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >

                <Row style={{ paddingRight: '2px' }}>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        <div style={{ ...styles.myMessage, ...{ borderRadius } }}>
                            { message.text }
                        </div>

                    </Col>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        {
                            this.state.selected &&
                            <div style={{ width: '100%', height: '44px' }}>

                                <div style={{ width: 'calc(100% - 52px)' }}>
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

                    <Col xs={12}>
                        { this.renderReads(message) }
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
        fontSize: '15px',
        backgroundColor: 'rgb(24, 144, 255)', 
    }
}