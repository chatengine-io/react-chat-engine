import React, { Component } from 'react'

import { CloseOutlined } from '@ant-design/icons'

export default class AutoComplete extends Component {
    state = {
        focused: false,
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
        this.setState({ showAll })
        this.props.handleChange && this.props.handleChange(value)
    }

    getNames(options) {
        const max = 3 
        let count = 0
        
        const results = []
        
        options.map(option => {
            if (option.toLowerCase().indexOf(this.props.value.toLowerCase()) !== -1 && count < max) {
                count = count + 1
                results.push(option)
            }
        })
        
        return results
    }

    renderOptions(options) {
        if(!this.props.value && !this.state.showAll) { return <div /> }

        const results = this.getNames(options)

        return results.map((option, index) => {
            return (
                <div key={`option_${index}`}>

                    { this.props.renderOption && this.props.renderOption(option) }

                    { 
                        index == results.length - 1 && 
                        <div style={styles.close} onClick={() => this.onChange('', false)}>
                            
                            <CloseOutlined />
                            
                        </div>
                    }

                </div>
            )
        })
    }

    render() {
        const { options } = this.props
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

                {
                    options && options.length > 0 && this.state.showAll &&
                    <div style={{ borderRadius: '19px', border: '1px solid #afafaf', }}>
                        { this.renderOptions(this.props.options) }
                    </div>
                }
            
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
    close: {
        textAlign: 'center', 
        padding: '8px 12px', 
        fontSize: '15px', 
        borderRadius: '24px', 
        cursor: 'pointer'
    }
}