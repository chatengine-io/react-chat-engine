import React, { Component } from 'react'

export default class TextInput extends Component {
    state = {
        focused: false
    }

    componentDidMount() {
        if(this.props.default) {
            console.log('this.props.default', this.props.default)
            const event = {target: {value: this.props.default}}
            this.props.handleChange(event)
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
                onChange={(e) => this.props.handleChange(e)} 
                onBlur={() => this.setState({ focused: false })}
                onFocus={() => this.setState({ focused: true })}
                type={this.props.type ? this.props.type : "text" }
            />
        )
    }
}

const styles = {
    input: {
        outline: 'none',
        height: '36px',
        fontSize: '16px',
        padding: '0px 8px',
        borderRadius: '4px',
        border: '1px solid #d9d9d9',
    },
    focusInput: {
        outline: 'none',
        height: '36px',
        fontSize: '16px',
        padding: '0px 8px',
        borderRadius: '4px',
        border: '1px solid #1890ff',
    }
}