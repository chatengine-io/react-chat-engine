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
                }}
            >
                <div style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                    { props.label }
                </div>

                {
                    collapsed ?
                    <LeftOutlined style={styles.collapseIcon} /> :
                    <DownOutlined style={styles.collapseIcon} />
                }
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
