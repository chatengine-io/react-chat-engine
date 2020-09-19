import React, { Component } from 'react'

export default class TheirMessage extends Component {
    state = {
        selected: false
    }

    render() {
        const { creds, message } = this.props

        if (!message) { return <div /> }

        return (
            <div 
                style={styles.theirMessage}
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >

                { message.text }

            </div>
        )
    }
}

const styles = {
    theirMessage: {
        color: 'green', 
        width: '100%', 
        cursor: 'pointer'
    },
}