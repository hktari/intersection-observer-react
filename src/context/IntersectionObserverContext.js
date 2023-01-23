import React, { Children, useContext, useRef } from "react";

const IntersectionObserverContext = React.createContext({});

const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0.1, 0.5]
}

function IntersectionObserverProvider({ children, options = defaultOptions }) {

    let observerCallbacks = new Map()
    let observer = new IntersectionObserver(observerCallback, options);

    function observerCallback(entries, observer) {

        const thresholdLow = observer.thresholds[0]
        const thresholdHigh = observer.thresholds[observer.thresholds.length - 1]
        
        entries.forEach(entry => {
            // there must be a callback for a given element, due to encapsulation of the IntersectionObserver object
            const callback = observerCallbacks.get(entry.target)

            if (entry.intersectionRatio >= thresholdHigh) {
                callback(entry.target, true)
            } else if (entry.intersectionRatio <= thresholdLow) {
                callback(entry.target, false)
            } else {
                // somewhere between thresholdLow and thresholdHigh
            }
        })
    }

    const startListening = (el, callback) => {
        if (!callback) {
            throw new Error(`callback must be defined. type is ${typeof callback}`)
        }

        observer.observe(el)
        observerCallbacks.set(el, callback)
    }

    const stopListening = (el, callback) => {
        if (!callback) {
            throw new Error(`callback must be defined. type is ${typeof callback}`)
        }

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