import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from '../../../Context'

import { SyncOutlined } from '@ant-design/icons'

const ConnectionBar = props => {
    const didMountRef = useRef(false)
    const [isVisible, setIsVisible] = useState(false)
    const { connecting } = useContext(ChatEngineContext)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setTimeout(
                () => setIsVisible(true), 
                props.renderDelay ? props.renderDelay : 0
            )
        }
    })

    if (!connecting || !isVisible) return <div />

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
            <SyncOutlined spin />{' '}Connecting
        </div>
    )
}

export default ConnectionBar
