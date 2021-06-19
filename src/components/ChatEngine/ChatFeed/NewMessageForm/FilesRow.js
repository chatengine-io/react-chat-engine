import React from 'react'

import { isImage } from './isImage'

import FilePreview from './FilePreview'

const FilesRow = props => {
    function renderFiles() {
        return props.files.map((file, index) => {
            if(!isImage(file.name)) {
                return (
                    <FilePreview 
                        file={file} 
                        key={`thumb_${index}`} 
                        onRemove={() => props.onRemove && props.onRemove(index)}
                    />
                )
            } else { 
                return <div key={`no_file_${index}`} /> 
            }
        })
    }
  
    return (
        <div 
            style={{ 
                width: 'calc(100% - 24px)', 
                padding:  props.files.lenth > 0 ? '6px 16px' : '0px'
            }}
        >
            { renderFiles() }
        </div>
    )
}

export default FilesRow