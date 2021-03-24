import React, { useState } from 'react';

import { PaperClipOutlined } from '@ant-design/icons'

const ImagesInput = props => {
    const [state, setState] = useState({
        hovered: false,
        files: []
    })

    function onSelect(event) {
        let files = []
        const indexes = [...Array(event.target.files.length).keys()]

        indexes.map((i, index) => {
            const file = event.target.files[index]
            if (file) { files.push(file) }
        })
        
        props.onSelectFiles &&  props.onSelectFiles(files)
    }

    return (
        <form
            className="uploader"
            encType="multipart/form-data"
            style={{ height: '0px' }}
        >
            <label
                htmlFor="files"
                id='upload-document-button'
            >
                <PaperClipOutlined 
                    onMouseEnter={() => setState({ ...state, hovered: true })}
                    onMouseLeave={() => setState({ ...state, hovered: false })}
                    style={{
                        ...{ cursor: 'pointer', position: 'absolute', bottom: '20px', right: '63px', fontSize: '18px' },
                        ...{ color: state.hovered ? '#69c0ff' : '#1890ff' }
                    }}
                />
            </label>

            <input
                multiple
                id="files"
                accept="image/x-png,image/gif,image/jpeg"
                style={{ visibility: "hidden" }}
                type="file"
                onChange={(e) => onSelect(e)} 
            />
        </form>
    );
}

export default ImagesInput
