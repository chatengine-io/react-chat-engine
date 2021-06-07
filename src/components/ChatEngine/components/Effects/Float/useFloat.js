import React from 'react';
import { useSpring } from 'react-spring';

export default function useBoop({
    x = 0,
    y = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    shadowX = 150,
    shadowY = 150,
    shadowBlur = 150,
    shadowColor = 150,
    springConfig = {
        tension: 300,
        friction: 10,
    },
    width = 'auto'
}) {
    const [isBooped, setIsBooped] = React.useState(false);
    const style = useSpring({
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        boxShadow: isBooped 
        ? `${shadowX} ${shadowY} ${shadowBlur} ${shadowColor}` 
        : '0px 0px 0px red',
        transform: isBooped
        ? `translate(${x}px, ${y}px)
            rotate(${rotation}deg)
            scale(${scale})`
        : `translate(0px, 0px)
            rotate(0deg)
            scale(1)`,
        config: springConfig,
        width: width,
    });
    React.useEffect(() => {
        if (!isBooped) { return; }
        const timeoutId = window.setTimeout(() => {
            setIsBooped(false);
        }, timing);
        return () => { window.clearTimeout(timeoutId); };
    }, [isBooped]);
    const trigger = React.useCallback(() => {
        console.log('here')
        setIsBooped(true);
    }, []);
    return [style, trigger];
}