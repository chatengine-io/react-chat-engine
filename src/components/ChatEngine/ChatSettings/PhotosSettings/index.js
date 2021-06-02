import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Thumbnail from './Thumbnail'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'


const PhotosSettings = props => {
    const [state, setState] = useState({
        collapsed: true,
        hovered: false
    })
    const { chat } = props

    function renderPhotos(attachments) {
        return attachments.map((attachment, index) => {
            return <Thumbnail key={`person_${index}`} attachment={attachment} />
        })
    }

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }} className='ce-photo-section'>
            <div 
                onMouseEnter={() => setState({ ...state, hovered: true })}
                onMouseLeave={() => setState({ ...state, hovered: false })}
                onClick={() => setState({ ...state, collapsed: !state.collapsed })}
                style={state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
                className='ce-section-title-container ce-photo-title-container'
            >
                <div 
                    className='ce-section-title ce-photo-title'
                    style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}
                >
                    Photos
                </div>

                {
                    state.collapsed ?
                    <LeftOutlined style={styles.collapseIcon} /> :
                    <DownOutlined style={styles.collapseIcon} />
                }
            </div>

            {
                !state.collapsed &&
                <div className='ce-photo-feed'>
                    <div style={{ height: '12px' }} />

                    { renderPhotos(chat.attachments) }
                </div>
            }
        </div>
    )
}

export default PhotosSettings

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}

PhotosSettings.propTypes = {
    chat: PropTypes.object,
}