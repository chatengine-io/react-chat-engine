import React, { useState } from 'react'

import SocketChild from './Socket3'


const Socket = props => {
    const [hide, setHide] = useState(false)

    function reRender() {
        setHide(true)
        setTimeout(() => {
            setHide(false)
        }, 100)
    }

    if (hide) {
        return <div />
    } else {
        return <SocketChild {...props} reRender={() => reRender()} />
    }
}

export default Socket