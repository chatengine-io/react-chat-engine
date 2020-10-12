import React from 'react';

import { PaperClipOutlined } from '@ant-design/icons'

export default class ImagesInput extends React.Component {
    state = {
        hovered: false,
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
                    style={{ position: 'absolute', bottom: '12px', right: '63px', zIndex: '1' }}
                >

                    <PaperClipOutlined 
                        onMouseEnter={() => this.setState({ hovered: true })}
                        onMouseLeave={() => this.setState({ hovered: false })}
                        style={ this.state.hovered ?
                            { fontSize: '20px', color: '#69c0ff', cursor: 'pointer' } :
                            { fontSize: '20px', color: '#1890ff' }
                        } 
                    />

                </label>

                <input
                    multiple
                    id="files"
                    accept="image/x-png,image/gif,image/jpeg"
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