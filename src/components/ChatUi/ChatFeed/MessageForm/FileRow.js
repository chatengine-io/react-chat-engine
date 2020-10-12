import React from 'react'

import Thumbnail from './Thumbnail'

export default class FileRow extends React.Component {
    renderFiles() {
        return this.props.files.map((file, index) => {
            return (
                <Thumbnail 
                    file={file} 
                    key={`thumb_${index}`} 
                    onRemove={() => this.props.onRemove && this.props.onRemove(index)}
                />
            )
        })
    }
  
    render() {
        return (
            <div style={{ width: 'calc(100% - 24px)', paddingLeft: '12px' }}>
                { this.renderFiles() }
            </div>
      ) ;
    }
}