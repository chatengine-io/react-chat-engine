import React, { useState, useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import _ from 'lodash'

import { getFileName, isImage } from './file'

import Thumbnail from './Thumbnail'
import FileView from './FileView'

import Dot from '../../../components/Avatar/Dot'
import { getDateTime, formatTime } from '../../../Utilities/timezone'

import Body from './Body'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })

const Message = props => {
    const { conn } = useContext(ChatEngineContext)
    const [hovered, setHovered] = useState(false)

    function renderReads() {
        const { chat, message } = props

        if (!chat) { return <div /> }

        return chat.people.map((chatPerson, index) => {
            return (
                <Dot
                    key={`read_${index}`}
                    avatar={chatPerson.person.avatar}
                    username={chatPerson.person.username}
                    visible={message.id === chatPerson.last_read}
                    style={{ float: 'right', marginLeft: '4px' }}
                />
            )
        })
    }

    function renderImages() {
        const { message } = props
        const attachments = message && message.attachments ? message.attachments : []
        return attachments.map((attachment, index) => {
            const fileName = getFileName(attachment.file ? attachment.file : attachment.name)
            if (isImage(fileName)) {
                return <Thumbnail attachment={attachment.file && attachment} key={`attachment_${index}`} />
            } else {
                return <div key={`attachment${index}`} />
            }
        })
    }

    function renderFiles() {
        const { message } = props
        const attachments = message && message.attachments ? message.attachments : []
        return attachments.map((attachment, index) => {
            const fileName = getFileName(attachment.file ? attachment.file : attachment.name)
            if (!isImage(fileName)) {
                return <FileView attachment={attachment.file && attachment} key={`attachment_${index}`} />
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
    const paddingBottom = (!nextMessage || nextMessage.sender_username !== message.sender_username) ? '12px' : '2px'

    return (
        <div
            className='ce-message-row ce-my-message'
            style={{ width: '100%', textAlign: 'right', paddingBottom }}
        >
            <div
                style={{ display: 'auto' }}
                className='ce-my-message-attachments-container ce-my-message-images-container'
            >
                {renderImages()}
            </div>

            <div
                style={{ display: 'auto' }}
                className='ce-my-message-attachments-container ce-my-message-files-container'
            >
                {renderFiles()}
            </div>

            <Row
                style={{ paddingRight: '2px' }}
                className='ce-message-bubble-row ce-my-message-bubble-row'
            >
                <Col xs={12} sm={12} md={12}>
                    <span 
                        className='ce-message-timestamp ce-my-message-timestamp'
                        style={{
                            ...styles.timeTag,
                            ...{ opacity: hovered ? '1' : '0' }
                        }}
                    >
                        {formatTime(getDateTime(message.created, conn !== null && conn.offset))}
                    </span>

                    {   // TODO: What is !attachments for?
                        !attachments || message.text &&
                        <div
                            className='ce-message-bubble ce-my-message-bubble'
                            style={{ 
                                ...styles.myMessage, 
                                ...{ borderRadius },
                                ...{ backgroundColor: props.sending ? '#40a9ff' : 'rgb(24, 144, 255)' }
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <Body myMessage={true} text={message.text} />
                        </div>
                    }
                </Col>

                <Col xs={1} sm={2} md={3} />

                <Col xs={12} className='ce-reads-row ce-my-reads-row'>
                    {renderReads()}
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
        overflowWrap: 'anywhere',
        maxWidth: 'calc(100% - 100px)',
        // CSS Transitions
        transition: "all .33s ease",
        WebkitTransition: "all .33s ease",
        MozTransition: "all .33s ease",
    },
    timeTag: { 
        position: 'relative', 
        top: 'calc(50% - 12px)', 
        right: '8px', 
        fontSize: '14px', 
        color: 'rgb(24, 144, 255)',
        // CSS Transitions
        transition: "all .15s ease",
        WebkitTransition: "all .15s ease",
        MozTransition: "all .15s ease",
    }
}