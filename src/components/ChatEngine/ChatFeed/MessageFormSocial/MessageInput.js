import React, { Component } from 'react'

export default class MessageInput extends Component {
    state = {
        value: null,
        height: 0
    }

    resize() {
        var textarea = document.getElementById("msg-textarea");
        textarea.style.height = "";
        textarea.style.height = Math.min(textarea.scrollHeight, 150) + "px";
        this.setState({ height: Math.min(textarea.scrollHeight, 150) })
    }

    componentDidMount() { this.resize() }

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
            <input 
                id='msg-textarea'
                className='ce-input ce-textarea-input'
                style={styles.input}
                value={this.props.value}
                placeholder={this.props.label}
                onChange={(e) => this.handleChange(e)} 
                onKeyDown={(e) => this.onKeyDown(e)}
            />
        )
    }
}

const styles = {
    input: { 
        border: '1px solid white',
        width: 'calc(100% - 100px)',
        outline: 'none', 
        fontSize: '15px',
        fontFamily: 'Avenir',
        paddingLeft: '12px',
        paddingRight: '12px',
        position: 'relative', 
        left: '12px',
        resize: 'none', 
        overflowX: 'hidden'
    }
}