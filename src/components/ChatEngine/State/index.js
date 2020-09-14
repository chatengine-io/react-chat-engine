import React, { useContext } from 'react';

import { Context } from '../Store'


const State = (props) => {
    const [state, dispatch] = useContext(Context);
    dispatch({type: 'SET_STATE', payload: props});    
    return <div />
};


export default State;