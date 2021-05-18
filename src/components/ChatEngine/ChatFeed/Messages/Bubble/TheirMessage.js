import React from 'react'

import Thumbnail from './Thumbnail'

import { Avatar, Dot } from 'react-chat-engine'

import Body from './Body'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })


const TheirMessage = props => {
    function renderReads() {
        const { chat, message } = props

        if(!chat) { return <div /> }

        return chat.people.map((person, index) => {
            if (message.id === person.last_read) {
                return (
                    <Dot 
                        key={`read_${index}`}
                        avatar={person.person.avatar}
                        username={person.person.username}
                        style={{ float: 'left', marginLeft: '4px' }}
                    />
                )
            }
            return <div key={`read_${index}`} />
        })
    }

    function renderAttachments() {
        const { message } = props
        const attachments = message && message.attachments ? props.message.attachments : []
        return attachments.map((attachment, index) => {
            return <Thumbnail attachment={attachment} key={`attachment_${index}`} />
        })
    }

    const { lastMessage, message, nextMessage } = props

    if (!message) { return <div /> }

    const attachments = message && message.attachments && message.attachments

    const topLeftRadius = !lastMessage || lastMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'
    const bottomLeftRadius = !nextMessage || nextMessage.sender_username !== message.sender_username ? '1.3em' : '0.3em'

    const borderRadius = `${topLeftRadius} 1.3em 1.3em ${bottomLeftRadius}`
    const paddingBottom = !nextMessage || nextMessage.sender_username !== message.sender_username ? '12px' : '2px'

    return (
        <div 
            style={{ width: '100%', paddingBottom }}
            className='ce-message-row ce-their-message'
        >
            {
                (!lastMessage || lastMessage.sender_username !== message.sender_username) &&
                <div style={styles.nameText} className='ce-their-message-sender'>
                    { message.sender_username }
                </div>
            }
        
            <Row style={{ paddingLeft: '2px' }} className='ce-their-message-row'>
                <Col xs={11} sm={10} md={9}>
                    <div style={{ height: '0px' }} className='ce-their-message-avatar'>
                        {
                            (!nextMessage || nextMessage.sender_username !== message.sender_username) &&
                            <Avatar
                                show_online={false}
                                username={message.sender_username}
                                avatar={message.sender && message.sender.avatar}
                            />
                        }

                    </div>

                    <div 
                        style={{ display: 'auto', paddingLeft: '50px' }}
                        className='ce-their-message-attachments-container'
                    >
                        { renderAttachments() }
                    </div>

                    {
                        !attachments || message.text &&
                        <div style={{ paddingLeft: '48px' }}>
                            <div
                                className='ce-message-bubble ce-their-message-bubble'
                                style={{ ...styles.theirMessage, ...{ borderRadius } }}
                            >
                                <Body text={message.text} />
                            </div>
                        </div>  
                    }
                </Col>

                {/* Col is 9 to not slipp into RHS */}
                <Col 
                    xs={9} 
                    style={{ marginLeft: '48px' }} 
                    className='ce-reads-row ce-their-reads-row'
                >
                    { renderReads() }
                </Col>
            </Row>
        </div>
    )
}

export default TheirMessage

const styles = {
    theirMessage: {
        cusor: 'auto',
        color: 'black', 
        float: 'left',
        padding: '12px',
        fontSize: '15px',
        whiteSpace: 'pre-line',
        backgroundColor: '#f1f0f0', 
        overflowWrap: 'anywhere'
    },
    nameText: { 
        paddingLeft: '62px', 
        paddingBottom: '2px', 
        color: 'rgba(0, 0, 0, .40)', 
        fontSize: '15px' 
    }
}