import React, { Component } from 'react'

import { PaperClipOutlined } from '@ant-design/icons'

export default class AutoComplete extends Component {
    state = {
        focused: false,
        value: null,
        showAll: false,
    }

    onFocus() {
        this.onChange('', true)
        this.setState({ focused: true })
        this.props.onFocus && this.props.onFocus()
    }

    onBlur() {
        this.setState({ focused: false })
        this.props.onBlur && this.props.onBlur()
    }

    onChange(value, showAll) {
        this.setState({ value, showAll })
        this.props.handleChange && this.props.handleChange(value)
    }

    renderOptions(options) {
        const max = 3 
        let count = 0

        if(!this.state.value && !this.state.showAll) { return <div /> }

        return options.map((option, index) => {
            if (option.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1 && count < max) {
                count = count + 1

                return (
                    <div key={`option_${index}`} style={styles.option}>
                        {option}
                    </div>
                )
            
            } else if (index == options.length - 1) {
                return (
                    <div 
                        key={`option_${index}`} 
                        style={styles.close}
                    >

                        <PaperClipOutlined />
                        
                        {` Close`}

                    </div>
                )
            }
        })
    }

    render() {
        const customStyle = this.props.style ? this.props.style : {}
        const defaultStyle = { ...styles.input, ...{ border: this.state.focused ? '1px solid #1890ff' : '1px solid #d9d9d9' } }

        return (
            <div>
                <input 
                    value={this.props.value} 
                    placeholder={this.props.label}
                    style={{ ...defaultStyle, ...customStyle }}
                    type={this.props.type ? this.props.type : "text" }
                    onBlur={() => this.onBlur()}
                    onFocus={() => this.onFocus()}
                    onChange={(e) => this.onChange(e.target.value, true)}
                />
            
                { this.renderOptions(this.props.options ? this.props.options : []) }
            
            </div>
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
    },
    option: {
        padding: '12px 24px',
        border: '1px solid #afafaf',
        borderRadius: '24px',
        cursor: 'pointer'
    },
    close: {
        textAlign: 'center', 
        padding: '12px', 
        borderRadius: '24px', 
        backgroundColor: 'rgb(217, 217, 217)' ,
        cursor: 'pointer'
    }
}