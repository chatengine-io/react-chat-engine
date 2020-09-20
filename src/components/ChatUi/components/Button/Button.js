import React, { Component } from 'react'

export default class Button extends Component {
    state = {
        hovered: false
    }

    render() {
        const themeStyle = this.props.theme == 'danger' ? styles.dangerButton : styles.button
        const customStyle = this.props.style ? this.props.style : {}
        const hoverStyle = this.state.hovered ? styles.hoverButton : {}

        return (
            <button 
                type={this.props.type}
                onClick={() => this.props.onClick && this.props.onClick()}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
                style={{ ...themeStyle, ...customStyle, ...hoverStyle }}
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
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px 16px',
        backgroundColor: '#1890ff'
    },
    dangerButton: {
        color: 'red',
        border: 'none',
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '8px 16px',
        backgroundColor: 'white',
        border: '2px solid red',
    },
    hoverButton: {
        opacity: '0.66'
    }
}