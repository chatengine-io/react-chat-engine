import React, { useState } from 'react'

import SocketChild from './Socket4'


const Socket = props => {
    const [hide, setHide] = useState(false)

    function reRender() {
        setHide(true)
        console.log('Hiding')
        setTimeout(() => {
            console.log('Not hiding')
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