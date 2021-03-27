import React from 'react'

import { stringToColor } from '../Utilities/colorMapping'

const IsTyping = props => {
    return (
        <div style={{ color: stringToColor(props.username), padding: '2px', paddingLeft: '12px' }}>
            {`${props.username} is typing...`}
        </div>
    )
}
export default IsTyping