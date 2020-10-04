import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Dot extends Component {

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const color = stringToColor(this.props.text)
        
        return (
            <div style={{ ...styles.avatar, ...customStyle, ...{ backgroundColor: color } }} />
        )
    }
}

const styles = {
    avatar: {
        width: '10px',
        height: '10px',
        borderRadius: '22px',
        textAlign: 'center',
    }
}