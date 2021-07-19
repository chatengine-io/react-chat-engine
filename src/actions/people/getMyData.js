import axios from 'axios'

import * as str from '..'
import { getHeaders } from '../auth'

export function getMyData(props, callback) {
    axios.get(
        `${str.getApiUrl(props)}/users/me/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Get Myself Error', error)
    });
}