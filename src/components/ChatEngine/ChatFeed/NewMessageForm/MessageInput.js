import React, { Component } from 'react'

export default class MessageInput extends Component {
    state = {
        focused: false,
        value: null
    }

    componentDidMount() {
        const value = this.props.default

        if(value) {
            this.props.handleChange({ target: { value } })
            this.setState({ value })
        }
    }

    resize() {
        var textarea = document.getElementById("msg-textarea");
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
    }

    componentDidMount() {
        this.resize()
    }

    handleChange(e) {
        this.resize()
        this.props.handleChange && this.props.handleChange(e)
    }

    onKeyDown(e) {
        if (e.key === 'Enter') { 
            e.preventDefault()

            if (this.props.value.length > 0) {
                this.props.onSubmit && this.props.onSubmit(e) 
            }
        }
    }

    render() {
        return (
            <textarea 
                id='msg-textarea'
                className='ce-input ce-textarea-input'
                rows='1'
                style={ styles.input }
                value={ this.props.value }
                placeholder={ this.props.label }
                onBlur={() => this.setState({ focused: false })}
                onFocus={() => this.setState({ focused: true })}
                type={this.props.type ? this.props.type : "text" }
                onChange={(e) => this.handleChange(e)} 
                onKeyDown={(e) => this.onKeyDown(e)}
            />
        )
    }
}
// This is another thing we need to chat about which regards the competence of one more
const styles = {
    input: { 
        // border: '1px solid white',
        // width: 'calc(100% - 64px - 24px - 44px)',
        // outline: 'none', 
        // fontFamily: 'inherit',
        // fontSize: '15px',
        // fontFamily: 'Avenir',
        // paddingLeft: '12px',
        // paddingRight: '12px',
        // Position
        // position: 'relative', 
        // left: '12px',
        // resize: 'none', 
    }
}