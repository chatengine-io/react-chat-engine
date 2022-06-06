import React, { useState } from 'react'

import SocketChild from './ChatSocket'

const ChatSocket = (props) => {
  const [hide, setHide] = useState(false)

  function reRender() {
    setHide(true)
    setTimeout(() => setHide(false), 100)
  }

  return (
    <div>{!hide && <SocketChild {...props} reRender={() => reRender()} />}</div>
  )
}

export default ChatSocket
