import React from 'react'

import { CloseCircleTwoTone } from '@ant-design/icons'

export default class FileRow extends React.Component {
    state = {
        hovered: false
    }
  
    render() {
        return (
            <div 
                style={{ padding: '12px 6px', display: 'inline' }}
                onMouseEnter={() => this.setState({ hovered: true })}
                onMouseLeave={() => this.setState({ hovered: false })}
            >
                
                <img
                    style={styles.imageSquare}
                    alt={this.props.file.name}
                    src={URL.createObjectURL(this.props.file)}
                />

                {
                    this.state.hovered &&
                    <CloseCircleTwoTone 
                        style={styles.closeIcon} 
                        onClick={() => this.props.onRemove && this.props.onRemove()}
                    />
                }

            </div>
      ) ;
    }
}

const styles = {
    imageSquare: { 
        height: '108px', 
        width: '108px', 
        border: '1px solid #afafaf',
        borderRadius: '8px',
        objectFit: 'cover',
        display: 'inline',
    },
    closeIcon: {
        position: 'relative', 
        bottom: '91px', 
        right: '20px', 
        width: '0px', 
        cursor: 'pointer'
    }
}