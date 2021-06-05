import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { stringToColor } from '../../../Utilities/colorMapping' 


export default class Dot extends Component {
    state = { avatar: '' }

    updateImg() {
        let { avatar } = this.props
        avatar = avatar && avatar !== null ? avatar : ''
        
        if (avatar.split('?')[0] !== this.state.avatar.split('?')[0]) {
            this.setState({ avatar })
        }
    }

    componentDidMount() { this.updateImg() }

    componentDidUpdate() { this.updateImg() }

    render() {
        const { username } = this.props
        const color = stringToColor(username)
        const customStyle = this.props.style ? this.props.style : {}
        
        return (
            <div
                className='ce-avatar-dot'
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

Dot.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    style: PropTypes.object,
}