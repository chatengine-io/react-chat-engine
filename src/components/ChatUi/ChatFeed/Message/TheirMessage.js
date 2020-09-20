import React, { Component } from 'react'

import Avatar from '../../components/Avatar'

import { Row, Col, setConfiguration } from 'react-grid-system'

setConfiguration({ maxScreenClass: 'xl' })


export default class TheirMessage extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, message } = this.props

        if (!message) { return <div /> }

        return (
            <div style={{ width: '100%', paddingBottom: '12px' }}>
            
                <Row style={{ paddingLeft: '2px' }}>

                    <Col xs={11} sm={10} md={9}>

                        <div style={{ height: '0px' }}>
                            
                            <Avatar text={message.sender} />

                        </div>

                        <div style={{ paddingLeft: '48px' }}>

                            <div 
                                style={styles.theirMessage}
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
        color: 'black', 
        cursor: 'pointer',
        float: 'left',
        padding: '12px',
        borderRadius: '1.3em',
        backgroundColor: '#f1f0f0', 
    },
}