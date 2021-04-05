import React from 'react'

import Thumbnail from './Thumbnail'

import Dot from '../../../components/Avatar/Dot'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

const SendingMessage = props => {
    function renderReads() {
        const { chat, message } = props

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

    function renderAttachments(attachments) {
        return attachments.map((a, index) => {
            return <Thumbnail key={`sending-file-${index}`} />
        })
    }

    const { lastMessage, message, nextMessage } = props

    if (!message) { return <div /> }

    const attachments = message && message.attachments ? message.attachments : []

    const topRightRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'
    const bottomRightRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'

    const borderRadius = `1.3em ${topRightRadius} ${bottomRightRadius} 1.3em`
    const paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px'

    return (
        <div 
            className='ce-message-row ce-my-message ce-my-message-sending'
            style={{ width: '100%', textAlign: 'right', paddingBottom }}
        >
            <div 
                style={{ display: 'auto' }} 
                className='ce-my-message-attachments-container'
            >
                { renderAttachments(attachments) }
            </div>

            <Row
                style={{ paddingRight: '2px' }} 
                className='ce-message-bubble-row ce-my-message-bubble-row ce-my-message-sending-row'
            >
                <Col xs={1} sm={2} md={3} />

                <Col xs={11} sm={10} md={9}>
                    {
                        message.text &&
                        <div
                            className='ce-message-bubble ce-my-message-bubble'
                            style={{ ...styles.myMessage, ...{ borderRadius } }}
                        >
                            { message.text }
                        </div>
                    }
                </Col>
                
                <Col xs={1} sm={2} md={3} />
            </Row>
        </div>
    )
}

export default SendingMessage

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