import React, { Component } from 'react'

import Thumbnail from './Thumbnail'

import Dot from '../../components/Avatar/Dot'
import Avatar from '../../components/Avatar'

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
            if (message.id == person.last_read) {
                return <Dot key={`read_${index}`} text={person.person} style={{ float: 'left', marginLeft: '4px' }} />
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

        const topLeftRadius = !lastMessage || lastMessage.sender !== message.sender ? '1.3em' : '0.3em'
        const bottomLeftRadius = !nextMessage || nextMessage.sender !== message.sender ? '1.3em' : '0.3em'

        const borderRadius = `${topLeftRadius} 1.3em 1.3em ${bottomLeftRadius}`
        const paddingBottom = !nextMessage || nextMessage.sender !== message.sender ? '12px' : '2px'

        return (
            <div style={{ width: '100%', paddingBottom }}>

                {
                    (!lastMessage || lastMessage.sender !== message.sender) &&
                    <div style={ styles.nameText }>
                        { message.sender }
                    </div>
                }

                <div style={{ display: 'auto', paddingLeft: '50px' }}>
                    
                        { this.renderAttachments() }
                    
                </div>

            
                <Row style={{ paddingLeft: '2px' }}>

                    <Col xs={11} sm={10} md={9}>

                        <div style={{ height: '0px' }}>
                            
                            {
                                !nextMessage || nextMessage.sender !== message.sender ?
                                <Avatar text={message.sender} />  :
                                <div />
                            }

                        </div>

                        <div style={{ paddingLeft: '48px' }}>

                            <div 
                                style={{ ...styles.theirMessage, ...{ borderRadius } }}
                                onMouseEnter={() => this.setState({ selected: true })}
                                onMouseLeave={() => this.setState({ selected: false })}
                            >
                                { message.text }
                            </div>
                        
                        </div>

                    </Col>

                    {/* Col is 9 to not slipp into RHS */}
                    <Col xs={9} style={{ marginLeft: '48px' }}>
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