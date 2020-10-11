import React from 'react'

export default class FileRow extends React.Component {

    renderFiles() {
      return this.props.files.map((file, index) => {
        return (
          <div key={`file_${index}`} style={{ display: 'inline' }}>
            <img
              style={{ maxHeight: '66px', maxWidth: '66px' }}
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          </div>
        )
      })
    }
  
    render() {
      return (
        <div style={{ display: 'inline', width: '100%' }}>
            { this.renderFiles() }
        </div>
      );
    }
}

const styles = {
}