import React, { Component } from 'react'

export default class TextInput extends Component {
    state = {
        focused: false,
        value: null
    }

    componentDidMount() {
        const value = this.props.default
        if(value) {
            const event = {target: {value}}
            this.props.handleChange(event)
            this.setState({ value })
        }
    }

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const defaultStyle = this.state.focused ? styles.focusInput : styles.input

        return (
            // NOTE: You may need to make a div the searchContainer to put icons in...
            <input 
                value={this.props.value} 
                placeholder={this.props.label}
                style={{ ...defaultStyle, ...customStyle }}
                onBlur={() => this.setState({ focused: false })}
                onFocus={() => this.setState({ focused: true })}
                type={this.props.type ? this.props.type : "text" }
                onChange={(e) => this.props.handleChange && this.props.handleChange(e)} 
            />
        )
    }
}

const styles = {
    input: {
        outline: 'none',
        height: '36px',
        fontSize: '16px',
        padding: '0px 12px',
        borderRadius: '4px',
        borderRadius: '24px',
        border: '1px solid #d9d9d9',
    },
    focusInput: {
        outline: 'none',
        height: '36px',
        fontSize: '16px',
        padding: '0px 12px',
        borderRadius: '4px',
        borderRadius: '24px',
        border: '1px solid #1890ff',
    }
}