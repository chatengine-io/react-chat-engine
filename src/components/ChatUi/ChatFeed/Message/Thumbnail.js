import React, { Component } from 'react'

export default class Thumbnail extends Component {

    render() {
        const { attachment } = this.props

        return (
            <img 
                style={ styles.thumbnail }
                src={attachment.file}
                alt={'image'}
            />
        )
    }
}

const styles = {
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