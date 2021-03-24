import React from 'react'

const Thumbnail = props => {
    const { attachment } = props 

    if (!attachment) { return <div /> }

    return (
        <div style={styles.container} className='ce-photo-thumbnail'>
            
            <div style={{ paddingTop: '100%' }} />
            
            <img
                alt={attachment.id}
                style={styles.image}
                src={attachment.file}
                className='ce-photo-img'
                id={`image-${attachment.id}`}
            />
            
        </div>
    )
}

export default Thumbnail

const styles = {
    container: { 
        position: 'relative', 
        width: 'calc(33% - 8px)', 
        border: '1px solid white', 
        display: 'inline-block',
        cursor: 'pointer'
    },
    image: {
        top: '0px', 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        objectFit: 'cover'
    }
}