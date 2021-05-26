import React from 'react'

import { getFileName, isImage } from './file'

import FileView from './FileView'
import Thumbnail from './Thumbnail'

import Body from './Body'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

const SendingMessage = props => {
    function renderImages(attachments) {
        return attachments.map((attachment, index) => {
            if(isImage(attachment.name)) {
                return <Thumbnail key={`attachment_${index}`} />
            } else { return <div key={`attachment${index}`} /> }
        })
    }

    function renderFiles(attachments) {
        return attachments.map((attachment, index) => {
            if(!isImage(attachment.name)) {
                return <FileView key={`attachment_${index}`} />
            } else { return <div key={`attachment${index}`} />}
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
                className='ce-my-message-attachments-container ce-my-message-images-container'
            >
                { renderImages(attachments) }
            </div>
            
            <div 
                style={{ display: 'auto' }} 
                className='ce-my-message-attachments-container ce-my-message-files-container'
            >
                { renderFiles(attachments) }
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
                            <Body text={message.text} />
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
        overflowWrap: 'anywhere'
    }
}