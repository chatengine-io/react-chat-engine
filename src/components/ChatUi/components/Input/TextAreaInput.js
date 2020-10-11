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

    resize() {
        var textarea = document.getElementById("msg-textarea");
        textarea.style.height = "";
        console.log(textarea.scrollHeight - 12)
        textarea.style.height = Math.min(textarea.scrollHeight - 12, 150) + "px";
    }

    componentDidMount() {
        this.resize()
    }

    handleChange(e) {
        this.resize()
        this.props.handleChange && this.props.handleChange(e)
    }

    render() {
        return (
            <textarea 
                id='msg-textarea'
                style={ styles.input }
                value={ this.props.value }
                placeholder={ this.props.label }
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
        borderRadius: '10px',
        border: '1px solid white',     
        width: 'calc(100% - 64px - 24px)', // 24px for 12px 
        resize: 'none', 
        outline: 'none', 
        top: '8px',
        left: '12px',
        position: 'relative', 
        paddingLeft: '12px', 
        paddingRight: '12px', 
        fontFamily: 'inherit'
    }
}