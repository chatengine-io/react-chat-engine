import React, { Component } from 'react'

import Thumbnail from './Thumbnail'

import Dot from '../../components/Avatar/Dot'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

export default class Message extends Component {
    state = {
        selected: false
    }

    renderReads() {
        const { chat, message } = this.props

        if(!chat) { return <div /> }

        return chat.people.map((chatPerson, index) => {
            if (message.id == chatPerson.last_read) {
                return <Dot key={`read_${index}`} person={chatPerson.person} style={{ float: 'right', marginLeft: '4px' }} />
            }
        })
    }

    renderAttachments(borderRadius) {
        const attachments = this.props.message ? this.props.message.attachments : []
        return attachments.map((attachment, index) => {
            return <Thumbnail attachment={attachment} key={`attachment_${index}`} borderRadius={borderRadius} />
        })
    }

    render() {
        const { lastMessage, message, nextMessage } = this.props

        if (!message) { return <div /> }

        const attachments = this.props.message && this.props.message.attachments

        const topRightRadius = !lastMessage || lastMessage.sender.username !== message.sender.username ? '1.3em' : '0.3em'
        const bottomRightRadius = !nextMessage || nextMessage.sender.username !== message.sender.username ? '1.3em' : '0.3em'

        const borderRadius = `1.3em ${topRightRadius} ${bottomRightRadius} 1.3em`
        const paddingBottom = !nextMessage || nextMessage.sender.username !== message.sender.username ? '12px' : '2px'

        return (
            <div 
                className='ce-message-row ce-my-message'
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
                style={{ width: '100%', textAlign: 'right', paddingBottom }}
            >

                <div 
                    style={{ display: 'auto' }} 
                    className='ce-my-message-attachments-container'
                >
                    { this.renderAttachments() }
                </div>

                <Row
                    style={{ paddingRight: '2px' }} 
                    className='ce-message-bubble-row ce-my-message-bubble-row'
                >

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={11} sm={10} md={9}>

                        {
                            !attachments || message.text && 
                            <div
                                className='ce-message-bubble ce-my-message-bubble'
                                style={{ ...styles.myMessage, ...{ borderRadius } }}
                            >
                                { message.text }
                            </div>
                        }

                    </Col>

                    <Col xs={1} sm={2} md={3} />

                    <Col xs={12} className='ce-reads-row ce-my-reads-row'>
                        { this.renderReads() }
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
        float: 'right', textAlign: 'left', // Stay right but render text
        padding: '12px',
        fontSize: '15px',
        whiteSpace: 'pre-line',
        backgroundColor: 'rgb(24, 144, 255)', 
    }
}