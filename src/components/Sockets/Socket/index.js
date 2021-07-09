import React, { useState } from 'react'

import SocketChild from './Socket'


const Socket = props => {
    const [hide, setHide] = useState(false)

    function reRender() {
        // console.log('re-render')
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