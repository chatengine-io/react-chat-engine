import React, { useContext, useRef, useState, useEffect } from 'react'

import { ChatEngineContext } from '../../../Context'

import { stringToColor } from '../../Utilities/colorMapping'

const IsTyping = () => {
    const didMountRef = useRef(false)
    const [currentTime, setCurrentTime] = useState(Date.now())
    const { conn, activeChat, typingCounter } = useContext(ChatEngineContext)
    const typers = typingCounter && typingCounter[activeChat] ? typingCounter[activeChat] : []

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setInterval(() => {
                setCurrentTime(Date.now())
            }, 1000) // Check time every second
        }
    })

    if (!conn || conn === null) return <div />

    return (
        <div>
            {
                Object.keys(typers).map((username, index) => {
                    if (conn.userName !== username && currentTime < typers[username] + 2000) {
                        return (
                            <div 
                                key={`typer_${index}`} 
                                className='ce-user-typing-text'
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

export default IsTyping