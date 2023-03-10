import React, { useContext, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../context/IntersectionObserverContext'

const useIsOnScreen = (elRef) => {

    const [isOnScreen, setIsOnScreen] = useState(false)

    const { observer } = useIntersectionObserver()

    useEffect(() => {

        if (!observer || !elRef.current) {
            return
        }

        observer.startListening(elRef.current, (el, isIntersecting) => {
            setIsOnScreen(isIntersecting)
        })

        return () => {
            if (elRef.current && observer) {
                observer.stopListening(elRef.current, setIsOnScreen)
            }
        }
    }, [elRef.current, observer])


    return isOnScreen
}

export default useIsOnScreen