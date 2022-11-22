import React, { useState } from 'react'

import DataLoader from './DataLoader'
import SocketChild from './Socket4'

const Socket = (props) => {
  const [reload, setReload] = useState(false)

  function reRender() {
    setReload(true)
    setTimeout(() => setReload(false), 100)
  }

  return (
    <div>
      {!reload && <DataLoader {...props} />}
      {!reload && <SocketChild {...props} reRender={() => reRender()} />}
    </div>
  )
}

export default Socket
