import React, { useState } from 'react'

import { FileOutlined } from '@ant-design/icons'

import { getFileName } from './file'

import { LoadingOutlined } from '@ant-design/icons'

const FileView = props => {
    const [hovered, setHovered] = useState(false)
    const { attachment } = props
    const style={ 
        ...styles.fileView, 
        ...{ 
            color: hovered ? '#1890ff' : '#434343',
            border: hovered ? '1px solid #1890ff' : '1px solid #434343',
        } 
    }

    if (!attachment) {
        return (
            <div style={styles.loadingContainer}>
                <LoadingOutlined  style={{ color: 'white', padding: '4px', fontSize: '24px' }} />
            </div>
        )
    }

    return (
        <div 
            style={style} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => window.open(attachment.file)}
        >
            <FileOutlined />{' '}{ getFileName(attachment.file) }
        </div>
    )
}

export default FileView

const styles = {
    loadingContainer: {
        display: 'inline-block', 
        borderRadius: '14px',
        marginRight: '2px',
        height: '48px', 
        width: '136px', 
        marginBottom: '4px',
        marginLeft: '4px',
        backgroundColor: '#d9d9d9',
    },
    fileView: { 
        padding: '12px',
        borderRadius: '14px',
        display: 'inline-block',
        marginBottom: '4px',
        marginRight: '2px',
        cursor: 'pointer',
    }
}