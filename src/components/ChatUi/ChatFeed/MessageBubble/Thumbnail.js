import React from 'react'

import { LoadingOutlined } from '@ant-design/icons'

const Thumbnail = props => {
    const { attachment } = props

    if (!attachment) {
        return (
            <div style={styles.loadingContainer}>
                <LoadingOutlined  style={{ color: 'white', padding: '4px', fontSize: '28px' }} />
            </div>
        )
    }

    return (
        <img 
            style={styles.thumbnail}
            src={attachment.file}
            alt={'thumb-nail'}
        />
    )
}

export default Thumbnail

const styles = {
    loadingContainer: {
        width: '100%', 
        cursor: 'pointer',
        textAlign: 'right', 
        display: 'inline-block', 
        objectFit: 'cover',
        borderRadius: '0.3em',
        marginRight: '2px',

        height: '30vw', 
        width: '30vw', 
        maxHeight: '200px',
        maxWidth: '200px',
        minHeight: '100px',
        minWidth: '100px',
        backgroundColor: '#d9d9d9',
    },
    thumbnail: { 
        width: '100%', 
        cursor: 'pointer',
        textAlign: 'right', 
        display: 'inline', 
        objectFit: 'cover',
        borderRadius: '0.3em',
        paddingRight: '2px',

        height: '30vw', 
        width: '30vw', 
        maxHeight: '200px',
        maxWidth: '200px',
        minHeight: '100px',
        minWidth: '100px',
    }
}