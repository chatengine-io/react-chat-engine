import * as str from '../index.js';

export const logout = () => (dispatch) => {
    dispatch({
        type: str.SIGN_OUT
    });
}