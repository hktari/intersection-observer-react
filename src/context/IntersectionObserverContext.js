import React, { Children, useContext, useRef } from "react";

const IntersectionObserverContext = React.createContext({});

function IntersectionObserverProvider({ children }) {

    let observerCallbacks = new Map()

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.5]
    }

    let observerCallback = (entries, observer) => {
        console.log('processing intersction update...')
        entries.forEach(entry => {
            // todo: what if no callback is found ?
            const callback = observerCallbacks.get(entry.target)
            if (entry.intersectionRatio >= 0.5) {
                callback(entry.target, true)
            } else if (entry.intersectionRatio <= 0.1) {
                callback(entry.target, false)
            } else {
                // somewhere between 0.1 and 0.5
            }
        })
    }

    let observer = new IntersectionObserver(observerCallback, options);

    const startListening = (el, callback) => {
        console.log(`attaching observer ${el.innerText}`)
        observer.observe(el)
        observerCallbacks.set(el, callback)
    }

    const stopListening = (el, callback) => {
        console.log(`removing observer ${el.innerText}`)
        observer.unobserve(el)
        observerCallbacks.delete(el)
    }

    const value = {
        observer: {
            startListening,
            stopListening
        }
    }

    return (
        <IntersectionObserverContext.Provider value={value}>
            {children}
        </IntersectionObserverContext.Provider>
    );
}

export const useIntersectionObserver = () => useContext(IntersectionObserverContext)

export default IntersectionObserverProvider