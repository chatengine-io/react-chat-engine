import React, { useState } from 'react'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

const SettingsBlock = (props) => {
    const [collapsed, setCollapsed] = useState(true)
    const [hovered, setHovered] = useState(false)

    return (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
            <div 
                id={props.id}
                className={props.className}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    cursor: 'pointer',
                    backgroundColor: hovered ? '#f0f0f0' : '#fff',
                    transition: `background-color 100ms`,
                }}
            >
                <div style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                    { props.label }
                </div>

                <LeftOutlined 
                    style={{
                        float: 'right',
                        position: 'relative',
                        bottom: '30px',
                        right: '12px',
                        transform: collapsed ? `rotate(0deg)` : `rotate(-90deg)`,
                        transition: `transform 100ms`,
                    }} 
                /> 
            </div>

            <div>
                { !collapsed && props.children }
            </div>
        </div>
    )
}

export default SettingsBlock

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}
