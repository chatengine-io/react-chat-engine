import React, { Component } from 'react'

import Avatar from '../../components/Avatar'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })


export default class TheirMessage extends Component {
    state = {
        selected: false
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
        backgroundColor: '#f1f0f0', 
    },
}