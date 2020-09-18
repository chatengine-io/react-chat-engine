import React, { Component } from 'react'

export default class TextInput extends Component {
    state = {
        focused: false
    }

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const defaultStyle = this.state.focused ? styles.focusInput : styles.input

        return (
            // NOTE: You may need to make this div the searchContainer to put icons in...
            <div>

                <input 
                    value={this.props.value} 
                    placeholder={this.props.label}
                    style={{ ...defaultStyle, ...customStyle }}
                    onChange={(e) => this.props.handleChange(e)} 
                    onBlur={() => this.setState({ focused: false })}
                    onFocus={() => this.setState({ focused: true })}
                    type={this.props.type ? this.props.type : "text" }
                />

            </div>
        )
    }
}

const styles = {
    tinyLabel: {
        paddingLeft: '10px',
        fontSize: '10px',
        backgroundColor: 'white',
    },
    input: {
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #d9d9d9',
    },
    focusInput: {
        padding: '8px',
        outline: 'none',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #1890ff',
    }
}