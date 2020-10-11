import React from 'react';

import { CameraOutlined } from '@ant-design/icons'

export default class ImagesInput extends React.Component {
    state = {
        files: []
    }

    onSelect(event) {
        let files = []
        const indexes = [...Array(event.target.files.length).keys()]

        indexes.map(index => {
            const file = event.target.files[index]
            files.push(file)
        })
        
        this.props.onSelectFiles &&  this.props.onSelectFiles(files)
    }

    render() {
        return (
            <form
                className="uploader"
                encType="multipart/form-data"
                style={{ height: '0px' }}
            >

                <label
                    htmlFor="files"
                    id='upload-document-button'
                    style={{ position: 'absolute', bottom: '12px', right: '62px', zIndex: '1' }}
                >
                        <CameraOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                </label>

                <input
                    multiple
                    id="files"
                    accept="*"
                    style={{ visibility: "hidden" }}
                    type="file"
                    onChange={(e) => this.onSelect(e)} 
                />

            </form>
        );
    }
}

const styles = {
}