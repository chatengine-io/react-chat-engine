import React from 'react';
import { animated } from 'react-spring';
import useBoop from './useBoop';

const Boop = ({ children, triggers=[], ...boopConfig }) => {
  const [style, trigger] = useBoop(boopConfig);

  function isTriggerPresent(trigger) {
    return triggers.indexOf(trigger) !== -1
  }

  return (
    <animated.span 
      style={style}
      onClick={() => isTriggerPresent('onClick') && trigger()}
      onMouseEnter={() => isTriggerPresent('onMouseEnter') && trigger()} 
      onMouseLeave={() => isTriggerPresent('onMouseLeave') && trigger()} 
    >
      {children}
    </animated.span>
  );
};

export default Boop