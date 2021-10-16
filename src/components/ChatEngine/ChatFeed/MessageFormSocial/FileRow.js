import React from 'react'

import Thumbnail from './Thumbnail'

const FileRow = props => {
    function renderFiles() {
        return props.files.map((file, index) => {
            return (
                <Thumbnail 
                    file={file} 
                    key={`thumb_${index}`} 
                    onRemove={() => props.onRemove && props.onRemove(index)}
                />
            )
        })
    }
  
    return (
        <div style={{ 
            width: '50px', 
            paddingLeft: '12px',
            position: 'absolute' ,
            bottom: '70px'
            }}>
            { renderFiles() }
        </div>
    )
}

export default FileRow