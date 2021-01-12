import React, { Component } from 'react'

import { PlusOutlined, ArrowUpOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons'

export default class Button extends Component {
    state = {
        hovered: false
    }

    render() {
        const { value, icon, theme, style } = this.props

        const customStyle = style ? style : {}
        const hoverStyle = this.state.hovered ? styles.hoverButton : {}
        const themeStyle = theme == 'danger' ? styles.dangerButton : styles.button

        return (
            <button 
                type={this.props.type}
                className='ce-primary-button'
                onClick={() => this.props.onClick && this.props.onClick()}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
                style={{ ...themeStyle, ...customStyle, ...hoverStyle }}
            >

                { icon == 'plus' && <PlusOutlined /> }
                { icon == 'send'  && <ArrowUpOutlined /> }
                { icon == 'delete'  && <DeleteOutlined /> }
                { icon == 'user-add'  && <UserAddOutlined /> }

                { value && icon ? ` ${value}` : value}  

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
        padding: '8px 16px',
        borderRadius: '33px',
        backgroundColor: '#1890ff'
    },
    dangerButton: {
        color: 'red',
        border: 'none',
        outline: 'none',
        height: '36px',
        fontSize: '15px',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '33px',
        backgroundColor: 'white',
        border: '1px solid red',
    },
    hoverButton: {
        opacity: '0.66'
    }
}