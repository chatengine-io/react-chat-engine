import axios from 'axios'

import * as str from '..'
import { getHeaders } from '../auth'

export function addPerson(props, chatId, userName, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { username: userName },
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('New Person Error', error)
    });
}