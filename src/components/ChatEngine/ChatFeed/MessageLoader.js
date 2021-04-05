import React, { useState, useRef, useEffect, useContext } from 'react'

import { ChatEngineContext } from '../../Context'

const MessageLoader = props => {
    const { setLoadMoreMessages } = useContext(ChatEngineContext)

    function useOnScreen(ref) {
        const [isIntersecting, setIntersecting] = useState(false)
      
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
                
                if (entry.isIntersecting) setLoadMoreMessages(true)
            }
        )
      
        useEffect(() => {
          observer.observe(ref.current)
          // Remove the observer as soon as the component is unmounted
          return () => { observer.disconnect() }
        }, [])
      
        return isIntersecting
    }
  
    const ref = useRef()
    const isVisible = useOnScreen(ref)
    
    return <div ref={ref} />
}

export default MessageLoader