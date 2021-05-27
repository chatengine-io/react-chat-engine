import React, { useState } from 'react'

import { FileOutlined } from '@ant-design/icons'

import { CloseCircleTwoTone } from '@ant-design/icons'

const FilePreview = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...styles.filePreview,
                ...{ paddingRight: hovered ? '6px' : '26px' }
            }}
        >
            <FileOutlined />{' '}{ props.file && props.file.name } {' '}
            
            {
                hovered &&
                <CloseCircleTwoTone 
                    style={styles.closeIcon} 
                    onClick={() => props.onRemove && props.onRemove()}
                />
            }
        </div>
    )
}

export default FilePreview

const styles = {
    filePreview: { 
        padding: '12px', 
        display: 'inline-block', 
        position: "relative", 
        border: '1px solid #40a9ff',
        color: '#434343',
        borderRadius: '14px'
    },
    closeIcon: {
    }
}
