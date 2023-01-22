import React, { useContext, useEffect, useState } from 'react'
import { useObserver } from '../context/ObserverContext'

const useOnBecomeVisible = (elRef) => {

    const [isVisible, setIsVisible] = useState(false)

    const { observer } = useObserver()

    useEffect(() => {

        if (!observer || !elRef.current) {
            return
        }

        observer.startListening(elRef.current, (isIntersecting) => {

            console.log(`intersecting box ${elRef.current.innerText}: ${isIntersecting}`)
            setIsVisible(isIntersecting)
        })

        return () => {
            if (elRef.current && observer) {
                observer.stopListening(elRef.current, setIsVisible)
            }
        }
    }, [elRef.current, observer])


    return isVisible
}

export default useOnBecomeVisible