import React, { useEffect, useState } from 'react'

const useOnBecomeVisible = (elRef) => {

    const [isVisible, setIsVisible] = useState(false)

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    let observerCallback = (entries, observer) => {
        console.log(`intersecting box ${entries[0].target.innerText}: ${entries[0].isIntersecting}`)
        setIsVisible(entries[0].isIntersecting)
    }

    let observer = new IntersectionObserver(observerCallback, options);

    useEffect(() => {

        if (elRef.current) {
            observer.observe(elRef.current)
        }

        return () => {
            // todo: cleanup observer 
            if (elRef.current) {
                observer.unobserve(elRef.current)
            }
        }
    }, [elRef.current])


    return isVisible
}

export default useOnBecomeVisible