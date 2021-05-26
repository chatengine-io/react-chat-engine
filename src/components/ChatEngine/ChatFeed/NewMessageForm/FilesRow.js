import React from 'react'

import { isImage } from './isImage'

const FilesRow = props => {
    function renderFiles() {
        return props.files.map((file, index) => {
            if(!isImage(file.name)) {
                return (
                    <div key={`no_thumb_${index}`}>
                        { file.name }
                    </div>
                )
            } else { return <div key={`no_thumb_${index}`} /> }
        })
    }
  
    return (
        <div style={{ width: 'calc(100% - 24px)', paddingLeft: '12px' }}>
            { renderFiles() }
        </div>
    )
}

export default FilesRow