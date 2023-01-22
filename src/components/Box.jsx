import React, { useRef } from 'react'
import useOnBecomeVisible from '../hooks/useOnBecomeVisible'

import './Box.css'

const Box = ({ children }) => {

    const box = useRef(null)
    const isVisible = useOnBecomeVisible(box)

    return (
        <div ref={box} className={`box ${isVisible ? 'box--show' : ''}`}>
            {children}
        </div>
    )
}

export default Box