import React, { Component } from 'react'

import { stringToColor } from '../Utilities/colorMapping'

export default class ChatFeed extends Component {
    render() {
        return (
            <div style={{ color: stringToColor(this.props.username), padding: '2px', paddingLeft: '12px' }}>
                {`${this.props.username} is typing...`}
            </div>
        )
    }
}