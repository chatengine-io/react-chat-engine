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
                        ...styles.icon,
                        ...{ color: state.hovered ? '#06c' : '#444' }
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

const styles = {
    icon: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-block',
        float: 'left',
        height: '24px',
        padding: '4px 5px',
        width: '28px',
    }
}

export default ImagesInput
