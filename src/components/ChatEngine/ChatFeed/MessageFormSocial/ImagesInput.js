import React, { useState } from 'react';

import { PaperClipOutlined } from '@ant-design/icons'

const ImagesInput = props => {
    const [state, setState] = useState({
        hovered: false,
    })

    function onSelect(event) {
        const files = Array.from(event.target.files)
        props.onSelectFiles &&  props.onSelectFiles(files)
    }

    return (
        <div
            className="uploader"
            encType="multipart/form-data"
            style={{ height: '0px' }}
            className='ce-upload-document-form'
        >
            <label
                htmlFor="files"
                id='ce-upload-document-button'
            >
                <PaperClipOutlined 
                    id='ce-upload-document-icon'
                    onMouseEnter={() => setState({ ...state, hovered: true })}
                    onMouseLeave={() => setState({ ...state, hovered: false })}
                    style={{
                        ...{ cursor: 'pointer', position: 'absolute', bottom: '20px', right: '63px', fontSize: '18px' },
                        ...{ color: state.hovered ? '#69c0ff' : '#1890ff' }
                    }}
                />
            </label>

            <input
               
                id="files"
                accept="image/x-png,image/gif,image/jpeg"
                style={{ visibility: "hidden" }}
                type="file"
                onChange={(e) => onSelect(e)}
                onClick={(e) => e.target.value = null}
            />
        </div>
    );
}

export default ImagesInput
