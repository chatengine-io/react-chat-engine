import React, { Component } from 'react'

import { LoadingOutlined } from '@ant-design/icons'

export default class Loading extends Component {
    render() {
        return (
            <LoadingOutlined 
                style={{ 
                    width: '100%', 
                    position: 'relative', 
                    top: 'calc(50% - 26px)', 
                    textAlign: 'center',
                    fontSize: '52px'
                }} 
            />
        )
    }
}
