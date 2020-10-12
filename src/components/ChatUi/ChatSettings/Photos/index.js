import React from 'react'

import Thumbnail from './Thumbnail'

export default class Photos extends React.Component {

    renderPhotos(attachments) {
        return attachments.map((attachment, index) => {
            return <Thumbnail key={`person_${index}`} attachment={attachment} />
        })
    }
  
    render() {
        const { chat } = this.props 

        if (!chat) { return <div /> }

        return (
            <div>

                { this.renderPhotos(chat.attachments) }
            
            </div>
        )
    }
}