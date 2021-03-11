import * as str from '../Actions/index.js';

const initialState = {};
  
// TODO: Name this AccountsReducer or something
export default function accountsReducer(state = initialState, action) {
    switch (action.type) {
        case str.SIGN_IN_OK:
            return {...action.payload}

        case str.SIGN_OUT:
            return initialState;
            
        default:
            return state;
    }
}