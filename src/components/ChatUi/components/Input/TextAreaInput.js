import React, { Component } from 'react'

export default class TextAreaInput extends Component {
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

    handleChange(e) {
        var textarea = document.getElementById("textarea");
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";

        this.props.handleChange && this.props.handleChange(e)
    }

    render() {
        // const customStyle = this.props.style ? this.props.style : {}
        // const defaultStyle = this.state.focused ? styles.focusInput : styles.input

        return (
            <textarea 
                id='textarea'
                style={{ width: '70%', marginRight: '66px', resize: 'none', outline: 'none', display: 'inline', border: '0px solid white', borderRadius: '15px' }}
                value={this.props.value} 
                placeholder={this.props.label}
                onBlur={() => this.setState({ focused: false })}
                onFocus={() => this.setState({ focused: true })}
                type={this.props.type ? this.props.type : "text" }
                onChange={(e) => this.handleChange(e)} 
            />
        )
    }
}

const styles = {
    input: {
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        padding: '0px 12px',
        borderRadius: '4px',
        borderRadius: '24px',
        border: '1px solid #d9d9d9',
    },
    focusInput: {
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        padding: '0px 12px',
        borderRadius: '4px',
        borderRadius: '24px',
        border: '1px solid #1890ff',
    }
}