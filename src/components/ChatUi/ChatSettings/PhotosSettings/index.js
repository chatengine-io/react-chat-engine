import React from 'react'

import Thumbnail from './Thumbnail'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class Photos extends React.Component {
    state = {
        collapsed: true,
        hovered: false
    }

    renderPhotos(attachments) {
        return attachments.map((attachment, index) => {
            return <Thumbnail key={`person_${index}`} attachment={attachment} />
        })
    }
  
    render() {
        const { chats, activeChat } = this.props

        if (!chats || !activeChat || !chats[activeChat]) { return <div /> }

        const chat = chats[activeChat]

        return (
            <div style={{ borderTop: '1px solid #f0f0f0' }} className='ce-photo-section'>
                <div 
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    onClick={() => this.setState({ collapsed: !this.state.collapsed })}
                    style={this.state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
                    className='ce-section-title-container ce-photo-title-container'
                >
                    <div 
                        className='ce-section-title ce-photo-title'
                        style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}
                    >
                        Photos
                    </div>

                    {
                        this.state.collapsed ?
                        <LeftOutlined style={styles.collapseIcon} /> :
                        <DownOutlined style={styles.collapseIcon} />
                    }
                </div>

                {
                    !this.state.collapsed &&
                    <div className='ce-photo-feed'>
                        <div style={{ height: '12px' }} />

                        { this.renderPhotos(chat.attachments) }
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
