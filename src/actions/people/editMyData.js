import axios from 'axios'

import * as str from '..'
import { getHeaders } from '../auth'

export function editMyData(props, data, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/me/`,
        data,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Edit Myself Error', error)
    });
}