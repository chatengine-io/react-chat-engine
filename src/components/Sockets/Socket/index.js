import React, { useState } from 'react'

import DataLoader from './DataLoader'
import SocketChild from './Socket4'

const Socket = (props) => {
  const [hide, setHide] = useState(false)

  function reRender() {
    setHide(true)
    setTimeout(() => setHide(false), 100)
  }

  return (
    <div>
      {!hide && <DataLoader {...props} />}
      {!hide && <SocketChild {...props} reRender={() => reRender()} />}
    </div>
  )
}

export default Socket
