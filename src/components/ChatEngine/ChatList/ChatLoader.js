import React, { useState, useRef, useEffect } from 'react'

const ChatLoader = props => {
    function useOnScreen(ref) {
        const [isIntersecting, setIntersecting] = useState(false)
      
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
                if (entry.isIntersecting) {
                    props.onVisible()
                }
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
    
    return <div ref={ref}>{isVisible && `Loading...`}</div>
}

export default ChatLoader