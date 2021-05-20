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
                        ...{ cursor: 'pointer', fontSize: '16px', position: 'absolute', right: '56px', bottom: '13px' },
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
                onClick={(e) => e.target.value = null}
            />
        </form>
    );
}

export default ImagesInput
