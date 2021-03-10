import React, { Component } from 'react'

import Dot from '../../components/Avatar/Dot'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

export default class SendingMessage extends Component {
    state = {
        selected: false
    }

    renderReads() {
        const { chat, message } = this.props

        if(!chat) { return <div /> }

        return chat.people.map((chatPerson, index) => {
            if (message.id === chatPerson.last_read) {
                return (
                    <Dot 
                        key={`read_${index}`}
                        avatar={chatPerson.person.avatar}
                        username={chatPerson.person.username}
                        style={{ float: 'right', marginLeft: '4px' }} 
                    />
                )
            }
            return <div key={`read_${index}`} />
        })
    }

    render() {
        const { lastMessage, message, nextMessage } = this.props

        if (!message) { return <div /> }

        const attachments = message && message.attachments && message.attachments

        const topRightRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'
        const bottomRightRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'

        const borderRadius = `1.3em ${topRightRadius} ${bottomRightRadius} 1.3em`
        const paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px'

        return (
            <div 
                className='ce-message-row ce-my-message ce-my-message-sending'
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
                style={{ width: '100%', textAlign: 'right', paddingBottom }}
            >
                <Row
                    style={{ paddingRight: '2px' }} 
                    className='ce-message-bubble-row ce-my-message-bubble-row ce-my-message-sending-row'
                >
                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>
                            <div
                                className='ce-message-bubble ce-my-message-bubble'
                                style={{ ...styles.myMessage, ...{ borderRadius } }}
                            >
                                { message.text }
                            </div>
                    </Col>
                    
                    <Col xs={1} sm={2} md={3} />
                </Row>
            </div>
        )
    }
}

const styles = {
    myMessage: {
        color: 'white', 
        cursor: 'pointer',
        float: 'right', textAlign: 'left', // Stay right but render text
        padding: '12px',
        fontSize: '15px',
        whiteSpace: 'pre-line',
        backgroundColor: '#40a9ff', 
    }
}