import React, { useContext, useRef } from 'react'
import { useIntersectionObserver } from '../context/IntersectionObserverContext'
import useIsOnScreen from '../hooks/useIsOnScreen'

import './Box.css'

const Box = ({ children }) => {

    const box = useRef(null)
    const isVisible = useIsOnScreen(box)
    
    return (
        <div ref={box} className={`box ${isVisible ? 'box--show' : ''}`}>
            {children}
        </div>
    )
}

export default Box