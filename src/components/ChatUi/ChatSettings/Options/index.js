import React from 'react'

import { Button } from '../../components/Button'

import { deleteChat } from 'react-chat-engine'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class Options extends React.Component {
    state = {
        collapsed: true,
        hovered: false
    }
  
    render() {
        const { chat, creds } = this.props 

        if (!chat) { return <div /> }

        return (
            <div style={{ borderTop: '1px solid #f0f0f0' }}>

                <div 
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    onClick={() => this.setState({ collapsed: !this.state.collapsed })}
                    style={this.state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
                >

                    <div style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                        Options
                    </div>

                    {
                        this.state.collapsed ?
                        <LeftOutlined style={styles.collapseIcon} /> :
                        <DownOutlined style={styles.collapseIcon} />
                    }

                </div>
                
                {
                    !this.state.collapsed &&
                    <div>

                        <div style={{ height: '12px' }} />

                        <Button 
                            value="Delete" 
                            theme='danger'
                            icon='delete'
                            onClick={() => deleteChat(creds, chat.id, (data) => {})}
                            style={{ width: '100%', marginBottom: '12px' }}
                        />

                    </div>
                }
            
            </div>
        )
    }
}

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}
