import React, { useContext } from 'react'

import { ChatEngineContext } from '../../Context'

import { stringToColor } from '../Utilities/colorMapping'

const Typers = props => {
    const { activeChat, typingCounter } = useContext(ChatEngineContext)

    const typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : []

    if (props.renderIsTyping) { return props.renderIsTyping(typers) }

    return Object.keys(typers).map((username, index) => {
        if (props.currentTime < typers[username]) {
            return (
                <div style={{ color: stringToColor(username), padding: '2px', paddingLeft: '12px' }}>
                    {`${username} is typing...`}
                </div>
            )
        } else {
            return <div key={`typer_${index}`} />
        }
    })
}
export default Typers