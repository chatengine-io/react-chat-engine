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

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    Photos
                </div>

                <div style={{ height: '12px' }} />

                { this.renderPhotos(chat.attachments) }
            
            </div>
        )
    }
}