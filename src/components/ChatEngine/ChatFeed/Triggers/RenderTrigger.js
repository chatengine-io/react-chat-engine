import React, { useState, useRef, useEffect, useContext } from 'react'

import { ChatEngineContext } from '../../../Context'

const RenderTrigger = props => {
    const { setLoadMoreMessages } = useContext(ChatEngineContext)

    function useOnScreen(ref) {
        const [isIntersecting, setIntersecting] = useState(false)
      
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
                
                if (entry.isIntersecting) { 
                    props.onEnter && props.onEnter()
                } else {
                    props.onLeave && props.onLeave()
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
    
    return <div ref={ref} id={props.id}>{props.children}</div>
}

export default RenderTrigger