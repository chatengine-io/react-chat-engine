import React, { useState } from 'react'

import { ArrowUpOutlined } from '@ant-design/icons'

const SendButton = () => {
    const [hover, setHover] = useState(false)

    return (
        <div style={{ height: "0px" }}>
            <div 
                id="ce-send-message-button"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ 
                    cursor: 'pointer',
                    backgroundColor: hover ? '#40a9ff' : '#1890ff',
                    display: 'inline-block',
                    padding: '5px 9px',
                    borderRadius: '8px',
                }}
            >
                <ArrowUpOutlined style={{ color: 'white' }} />
            </div>
        </div>
    );
}

export default SendButton
