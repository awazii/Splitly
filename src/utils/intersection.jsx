import React from 'react';
import { useInView } from 'react-intersection-observer';
const AnimateOnSightWrapper = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true, 
        rootMargin: '-50px 0px',
    });

    return (
        <div ref={ref} className="w-full min-h-[240px] max-h-[480px] relative">
            {inView ? children : null}
        </div>
    );
};

export default AnimateOnSightWrapper;