import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Dot extends Component {

    render() {
        const { person } = this.props
        const color = stringToColor(person.username)
        const customStyle = this.props.style ? this.props.style : {}
        
        return (
            <div
                style={{
                    ...styles.avatar,
                    ...customStyle,
                    ...{ backgroundColor: person.avatar ? 'white' : color },
                    ...{
                        backgroundImage: person.avatar && `url(${person.avatar})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '14px'
                    }
                }}
            />
        )
    }
}

const styles = {
    avatar: {
        width: '13px',
        height: '13px',
        borderRadius: '13px',
        textAlign: 'center',
    }
}