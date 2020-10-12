import React from 'react'

import { Button } from '../../components/Button'

import { deleteChat } from 'react-chat-engine'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class Options extends React.Component {
    state = {
        collapsed: false
    }
  
    render() {
        const { chat } = this.props 

        if (!chat) { return <div /> }

        return (
            <div style={{ borderTop: '1px solid #f0f0f0', paddingBottom: '12px' }}>

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    Options
                </div>

                {
                    this.state.collapsed ?
                    <LeftOutlined style={styles.collapseIcon} onClick={() => this.setState({ collapsed: false })} /> :
                    <DownOutlined style={styles.collapseIcon} onClick={() => this.setState({ collapsed: true })} />
                }
                
                {
                    !this.state.collapsed &&
                    <div>

                        <div style={{ height: '12px' }} />

                        <Button 
                            value="Delete" 
                            theme='danger'
                            icon='delete'
                            onClick={() => deleteChat(creds, chat.id)}
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
        bottom: '18px'
    }
}
