import React, { Component } from 'react'

const colors = [
    '#D64045',
    '#5B3000',
    '#00CC99',
    '#467599',
    '#1D3354',
    '#8F250C',
    '#6153CC',
    '#961D4E',
    '#A29F15',
    '#0CAADC',
    '#FF5154',
    '#FA7921',
]

export default class Avatar extends Component {

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const text = this.props.text.substring(0, 2).toUpperCase()

        return (
            <div style={{ ...styles.avatar, ...customStyle }}>
                
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
        backgroundColor: '#FA7921',

        textAlign: 'center',
        
    }
}