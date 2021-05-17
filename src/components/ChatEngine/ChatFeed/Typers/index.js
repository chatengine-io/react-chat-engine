import React, { useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

import { stringToColor } from '../../Utilities/colorMapping'

const Typers = props => {
    const { conn, activeChat, typingCounter } = useContext(ChatEngineContext)
    const typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : []

    if (!conn || conn === null) return <div />

    if (props.renderIsTyping) { return props.renderIsTyping(typers) }

    return (
        <div>
            {
                Object.keys(typers).map((username, index) => {
                    if (conn.userName !== username && props.currentTime < typers[username] + 2000) {
                        return (
                            <div 
                                key={`typer_${index}`} 
                                style={{ color: stringToColor(username), padding: '2px', paddingLeft: '12px' }}
                            >
                                {`${username} is typing...`}
                            </div>
                        )

                    } else {
                        return <div key={`typer_${index}`} />
                    }
                })
            }
        </div>
    )
}

export default Typers