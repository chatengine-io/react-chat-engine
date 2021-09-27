import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import { CaretDownOutlined } from '@ant-design/icons'

import { animateScroll } from "react-scroll"

const ScrollDownBar = (props) => {
    const didMountRef = useRef(false)
    const [isVisible, setIsVisible] = useState(false)
    const { conn, isBottomVisible } = useContext(ChatEngineContext)
    const { chat } = props

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            setTimeout(
                () => setIsVisible(true), 
                props.renderDelay ? props.renderDelay : 0
            )
        }
    })

    if (conn === null || !chat || chat === null) return <div />

    let lastReadMessage = undefined
    chat.people.map(person => {
        if (person.person.username === conn.userName) {
            lastReadMessage = person.last_read
        }
    })

    if (
        !isVisible ||
        isBottomVisible ||
        chat.last_message.id === undefined ||
        chat.last_message.id === lastReadMessage
    ) { return <div /> }

    return (
        <div
            style={{
                zIndex: '1',
                bottom: '94px',
                left: 'calc(50% - 78px)',
                position: 'absolute',
                fontSize: '15px',
                padding: '10px 22px',
                color: 'white',
                backgroundColor: '#389e0d',
                borderRadius: '1.3em',
                cursor: 'pointer',
            }}
            id='ce-scroll-down-bar'
            onClick={() => animateScroll.scrollToBottom({ duration: 333, containerId: "ce-feed-container" })}
        >
            <CaretDownOutlined />
            {conn.userName ? ' Unread Messages' : ' Scroll to Bottom'}
        </div>
    )
}

export default ScrollDownBar
