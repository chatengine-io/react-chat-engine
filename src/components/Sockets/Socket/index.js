import React, { useState, useRef, useContext, useEffect } from 'react'

import SocketChild from './Socket4'
import { getOrCreateSession } from './getOrCreateSession'
import { ChatEngineContext } from 'react-chat-engine'

const Socket = (props) => {
  const didMountRef = useRef(false)
  const [isHidden, setIsHidden] = useState(false)
  const { setConn, setCreds, setSessionToken } = useContext(ChatEngineContext)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      getSession()
    }
  })

  function getSession() {
    const sessionKey = `${props.projectID}/${props.userName}/${props.userSecret}`

    if (localStorage.getItem(sessionKey) !== null) {
      setConn(props)
      setCreds(props)
      setSessionToken(localStorage.getItem(sessionKey))
      console.log('Local fetch!')
      return
    }

    getOrCreateSession(
      props,
      (data) => {
        setConn(props)
        setCreds(props)
        setSessionToken(data.token)
        localStorage.setItem(sessionKey, data.token)
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
          localStorage.removeItem(sessionKey)
          props.onFailAuth && props.onFailAuth(props)
        }
        setTimeout(() => getSession(), 10 * 1000)
      }
    )
  }

  function reRender() {
    setIsHidden(true)
    setTimeout(() => setIsHidden(false), 100)
  }

  if (isHidden) return <div />

  return <SocketChild {...props} reRender={() => reRender()} />
}

export default Socket
