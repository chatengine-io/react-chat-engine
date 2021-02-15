import React, { Component } from 'react'

import Thumbnail from './Thumbnail'

import { Avatar, Dot } from 'react-chat-engine'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })


export default class TheirMessage extends Component {
    state = {
        selected: false
    }

    renderReads() {
        const { chat, message } = this.props

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
            return <div />
        })
    }

    renderAttachments(borderRadius) {
        const attachments = this.props.message ? this.props.message.attachments : []
        return attachments.map((attachment, index) => {
            return <Thumbnail attachment={attachment} key={`attachment_${index}`} borderRadius={borderRadius} />
        })
    }

    // renderPersonText(person) {
    //     if (person.first_name !== null) {
    //         return `${person.first_name}${person.last_name ? ` ${person.last_name}` : ''}`
    //     } else {
    //         return person.username
    //     }
    // }

    render() {
        const { lastMessage, message, nextMessage } = this.props

        if (!message) { return <div /> }

        const attachments = this.props.message && this.props.message.attachments

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
                            { this.renderAttachments() }
                        </div>

                        {
                            !attachments || message.text &&
                            <div style={{ paddingLeft: '48px' }}>
                                <div
                                    className='ce-message-bubble ce-their-message-bubble'
                                    onMouseEnter={() => this.setState({ selected: true })}
                                    onMouseLeave={() => this.setState({ selected: false })}
                                    style={{ ...styles.theirMessage, ...{ borderRadius } }}
                                >
                                    { message.text }
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
                        { this.renderReads() }
                    </Col>
                </Row>
            </div>
        )
    }
}

const styles = {
    theirMessage: {
        cusor: 'auto',
        color: 'black', 
        float: 'left',
        padding: '12px',
        fontSize: '15px',
        whiteSpace: 'pre-line',
        backgroundColor: '#f1f0f0', 
    },
    nameText: { 
        paddingLeft: '62px', 
        paddingBottom: '2px', 
        color: 'rgba(0, 0, 0, .40)', 
        fontSize: '15px' 
    }
}