import React, { Component } from 'react'

export default class Button extends Component {
    state = {
        hovered: false
    }

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const defaultStyle = this.state.hovered ? styles.hoverButton : styles.button

        return (
            <button 
                type={this.props.type}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
                style={{ ...defaultStyle, ...customStyle }}
            >
                {this.props.value}  
            </button>
        )
    }
}

const styles = {
    button: {
        color: 'white',
        border: 'none',
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        borderRadius: '4px',
        padding: '8px 16px',
        backgroundColor: '#1890ff'
    },
    hoverButton: {
        color: 'white',
        border: 'none',
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        borderRadius: '4px',
        padding: '0px 16px',
        backgroundColor: '#40a9ff'
    }
}