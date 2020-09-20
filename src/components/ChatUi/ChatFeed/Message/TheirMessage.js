import React, { Component } from 'react'

export default class TheirMessage extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, message } = this.props

        if (!message) { return <div /> }

        return (
            <div style={{ width: '100%', float: 'left', paddingLeft: '12px' }}> 

                <div 
                    style={styles.theirMessage}
                    onMouseEnter={() => this.setState({ selected: true })}
                    onMouseLeave={() => this.setState({ selected: false })}
                >
                    { message.text }
                </div>
            
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
        borderRadius: '6px 6px 6px 0px',
        backgroundColor: '#d9d9d9', 
    },
}