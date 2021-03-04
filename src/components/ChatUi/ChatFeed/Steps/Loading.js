import React, { Component } from 'react'

import { SyncOutlined } from '@ant-design/icons'

export default class Loading extends Component {
    render() {
        return (
            <div 
                style={{ 
                    zIndex: '1',
                    bottom: '66px', 
                    left: 'calc(50% - 78px)',
                    position: 'absolute', 
                    fontSize: '15px',
                    padding: '10px 22px', 
                    color: 'white',
                    backgroundColor: '#fa8c16',
                    borderRadius: '1.3em',
                }}
                id='ce-connecting-popup'
            >
                <SyncOutlined spin />
                {' '}
                Connecting
            </div>
        )
    }
}
