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
    stringToNumber(str){
        let sum = 0
        for (var i = 0; i < str.length; i++) {
            sum = sum + str.charCodeAt(i) - 97
        }
        return sum
    }

    hashColors(num) {
        const mod = num % colors.length
        return colors[num % colors.length]
    }

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const text = this.props.text.substring(0, 2).toUpperCase()
        const color = colors[this.stringToNumber(this.props.text) % colors.length]

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