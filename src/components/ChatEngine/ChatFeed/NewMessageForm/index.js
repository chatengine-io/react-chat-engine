import React, { useState, useEffect } from 'react'

import MessageForm from './MessageForm'

const NewMessageForm = props => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof document !== undefined) setLoading(false)
  }, [])

  if (loading) return <div />
  else return <MessageForm {...props} />
}

export default NewMessageForm