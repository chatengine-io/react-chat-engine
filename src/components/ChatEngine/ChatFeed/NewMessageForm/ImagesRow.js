import React from 'react'

import Thumbnail from './Thumbnail'

import { isImage } from './isImage'

const ImagesRow = props => {
    function renderFiles() {
        return props.files.map((file, index) => {
            if(isImage(file.name)) {
                return (
                    <Thumbnail 
                        file={file} 
                        key={`thumb_${index}`} 
                        onRemove={() => props.onRemove && props.onRemove(index)}
                    />
                )
            } else { 
                return <div key={`no_thumb_${index}`} /> 
            }
        })
    }
  
    return (
        <div style={{ width: 'calc(100% - 24px)', paddingLeft: '12px' }}>
            { renderFiles() }
        </div>
    )
}

export default ImagesRow