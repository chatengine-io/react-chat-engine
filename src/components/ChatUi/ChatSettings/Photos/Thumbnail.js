import React from 'react'

export default class Thumbnail extends React.Component {
    render() {
        const { attachment } = this.props 

        if (!attachment) { return <div /> }

        return (
            <div style={styles.container}>
                
                <div style={{ paddingTop: '100%' }} />
                
                <img
                    alt={attachment.id}
                    style={styles.image}
                    src={attachment.file}
                    id={`image-${attachment.id}`}
                />
                
            </div>
        )
    }
}

const styles = {
    container: { 
        position: 'relative', 
        width: 'calc(33% - 2px)', 
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