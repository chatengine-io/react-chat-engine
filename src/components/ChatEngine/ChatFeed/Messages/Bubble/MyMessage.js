import React from 'react'

import { getFileName, isImage } from './file'

import Thumbnail from './Thumbnail'
import FileView from './FileView'

import Dot from '../../../components/Avatar/Dot'

import Body from './Body'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

const Message = props => {
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

    function renderImages() {
        const { message } = props
        const attachments = message && message.attachments ? message.attachments : []
        
        return attachments.map((attachment, index) => {
            const fileName = getFileName(attachment.file)
            if(isImage(fileName)) {
                return <Thumbnail attachment={attachment} key={`attachment_${index}`} />
            } else { 
                return <div key={`attachment${index}`} /> 
            }
        })
    }

    function renderFiles() {
        const { message } = props
        const attachments = message && message.attachments ? message.attachments : []
        
        return attachments.map((attachment, index) => {
            const fileName = getFileName(attachment.file)
            if(!isImage(fileName)) {
                return <FileView attachment={attachment} key={`attachment_${index}`} />
            } else { 
                return <div key={`attachment${index}`} />
            }
        })
    }

    const { lastMessage, message, nextMessage } = props

    if (!message) { return <div /> }

    const attachments = message && message.attachments && message.attachments

    const topRightRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'
    const bottomRightRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'

    const borderRadius = `1.3em ${topRightRadius} ${bottomRightRadius} 1.3em`
    const paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px'

    return (
        <div 
            className='ce-message-row ce-my-message'
            style={{ width: '100%', textAlign: 'right', paddingBottom }}
        >
            <div 
                style={{ display: 'auto' }} 
                className='ce-my-message-attachments-container ce-my-message-images-container'
            >
                { renderImages() }
            </div>

            <div 
                style={{ display: 'auto' }} 
                className='ce-my-message-attachments-container ce-my-message-files-container'
            >
                { renderFiles() }
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
                            <Body myMessage={true} text={message.text} />
                        </div>
                    }
                </Col>

                <Col xs={1} sm={2} md={3} />

                <Col xs={12} className='ce-reads-row ce-my-reads-row'>
                    { renderReads() }
                </Col>
            </Row>
        </div>
    )
}

export default Message

const styles = {
    myMessage: {
        color: 'white', 
        cursor: 'pointer',
        float: 'right', textAlign: 'left', // Stay right but render text
        padding: '12px',
        fontSize: '15px',
        whiteSpace: 'pre-line',
        backgroundColor: 'rgb(24, 144, 255)', 
        overflowWrap: 'anywhere'
    }
}