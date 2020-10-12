import React from 'react'

import Thumbnail from './Thumbnail'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class Photos extends React.Component {
    state = {
        collapsed: false
    }

    renderPhotos(attachments) {
        return attachments.map((attachment, index) => {
            return <Thumbnail key={`person_${index}`} attachment={attachment} />
        })
    }
  
    render() {
        const { chat } = this.props 

        if (!chat) { return <div /> }

        return (
            <div style={{ borderTop: '1px solid #f0f0f0', paddingBottom: '12px' }}>

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    Photos
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
        bottom: '18px'
    }
}
