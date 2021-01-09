import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Dot extends Component {
    state = { avatar: '' } // State to avoid rerendering

    componentDidUpdate() {
        const avatar = this.props.person ? this.props.person.avatar : undefined
        if (avatar && avatar.split('?')[0] !== this.state.avatar.split('?')[0]) {
            this.setState({ avatar })
        }
    }

    render() {
        const { person } = this.props
        const color = stringToColor(person.username)
        const customStyle = this.props.style ? this.props.style : {}
        
        return (
            <div
                style={{
                    ...styles.dot,
                    ...customStyle,
                    ...{
                        backgroundColor: this.state.avatar ? 'white' : color,
                        backgroundImage: this.state.avatar && `url(${this.state.avatar})`,
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
    dot: {
        width: '13px',
        height: '13px',
        borderRadius: '13px',
        textAlign: 'center',
    }
}