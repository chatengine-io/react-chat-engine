import React, { useState, useRef, useContext, useEffect } from 'react'

import SocketChild from './Socket4'
import { getOrCreateSession } from './getOrCreateSession'
import { ChatEngineContext } from 'react-chat-engine'

const Socket = (props) => {
  const didMountRef = useRef(false)
  const [reload, setReload] = useState(false)
  const { setConn, setCreds, setSessionToken } = useContext(ChatEngineContext)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      getSession()
    }
  })

  function getSession() {
    getOrCreateSession(
      props,
      (data) => {
        setConn(props)
        setCreds(props)
        setSessionToken(data.token)
      },
      (e) => {
        if (e.response && e.response.status === 403) {
          console.log(
            `Your login credentials were not correct: \n
                        Project ID: ${props.projectID} \n
                        Username: ${props.userName} \n
                        User Secret: ${props.userSecret}\n
                        Double check these credentials to make sure they're correct.\n
                        If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
          )
          setConn(undefined)
          setCreds(undefined)
          props.onFailAuth && props.onFailAuth(props)
        }
        setTimeout(() => getSession(), 3000) // Try again
      }
    )
  }

  function reRender() {
    setReload(true)
    setTimeout(() => setReload(false), 100)
  }

  return (
    <div>
      {!reload && <SocketChild {...props} reRender={() => reRender()} />}
    </div>
  )
}

export default Socket
