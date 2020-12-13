import React, { Component } from 'react'

import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

import ChatList from '../../ChatList'

export default class ChatListDrawer extends Component {
    state = {
        isOpen: false
    }

    render() {
        return (
            <div> 

                <MenuOutlined
                    onClick={() => this.setState({ isOpen: true })}
                    style={{ color: 'rgb(24, 144, 255)', outline: 'none' }} 
                />

                { 
                    this.state.isOpen &&
                    <div style={styles.drawerContainer}>
                        <CloseOutlined onClick={() => this.setState({ isOpen: false })} />

                        <ChatList 
                        
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
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: '32px 24px',
        textAlign: 'left'
    }
}
