import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Avatar extends Component {

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const text = this.props.person.username ? this.props.person.username.substring(0, 2).toUpperCase() : ''
        const color = stringToColor(this.props.person ? this.props.person.username : '')        
        
        return (
            <div style={{ ...styles.avatar, ...customStyle, ...{ backgroundColor: color } }}>
                
                <div style={{ color: 'white', paddingTop: '12px', fontSize: '15px', fontWeight: '600' }}>
                
                    { text }
                
                </div>
            
            </div>
        )
    }
}

const styles = {
    avatar: {
        width: '44px',
        height: '44px',
        borderRadius: '22px',
        color: 'white',
        textAlign: 'center',
    }
}