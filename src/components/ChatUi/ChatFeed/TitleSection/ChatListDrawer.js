import React, { Component } from 'react'

import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

import ChatList from '../../ChatList'

export default class ChatListDrawer extends Component {
    state = {
        isOpen: false
    }

    render() {
        const chatLength = Object.keys(this.props.chats) && Object.keys(this.props.chats).length
        return (
            <div> 
                <MenuOutlined
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
                                My Chats
                            </div>

                            <div style={styles.subtitleText}>
                                {`${chatLength} chat${chatLength > 1 ? 's' : ''}`}
                            </div>
                        </div>

                        <ChatList 
                            {...this.props} 
                            onChatClick={(chatId) => {
                                this.props.onChatClick && this.props.onChatClick(chatId)
                                this.setState({ isOpen: false })
                            }}
                        />
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
        padding: '18px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    }
}
