import React from 'react';
import { animated } from 'react-spring';
import useFloat from './useFloat';

const Float = ({ children, triggers=[], ...floatConfig }) => {
  const [style, trigger] = useFloat(floatConfig);

  return (
    <animated.span 
      style={style}
      onMouseEnter={trigger} 
    //   onMouseLeave={trigger} 
    >
      {children}
    </animated.span>
  );
};

export default Float