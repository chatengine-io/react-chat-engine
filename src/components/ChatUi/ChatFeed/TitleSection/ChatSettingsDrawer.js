import React, { Component } from 'react'

import { SettingOutlined, CloseOutlined } from '@ant-design/icons'

import ChatSettings from '../../ChatSettings'

export default class ChatSettingsDrawer extends Component {
    state = {
        isOpen: false
    }

    render() {
        const chatLength = Object.keys(this.props.chats) && Object.keys(this.props.chats).length
        return (
            <div> 
                <SettingOutlined
                    onClick={() => this.setState({ isOpen: true })}
                    style={{ color: 'rgb(24, 144, 255)', outline: 'none' }} 
                />

                { 
                    this.state.isOpen &&
                    <div style={styles.drawerContainer}>
                        <CloseOutlined
                            style={styles.closeIcon}
                            onClick={() => this.setState({ isOpen: false })}
                        />

                        <div style={styles.titleContainer}>
                            <div style={styles.titleText}>
                                Chat Settings
                            </div>
                        </div>

                        <ChatSettings {...this.props} />
                    </div>
                }
            </div>
        );
    }
}

const styles = {
    drawerContainer: { 
        position: 'fixed',
        zIndex: '1',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        textAlign: 'left'
    },
    closeIcon: {
        position: 'absolute',
        left: '28px',
        top: '32px'
    },
    titleContainer: {
        width: '100%',
        padding: '24px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
}
