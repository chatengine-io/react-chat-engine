import axios from 'axios'

import * as str from '..'
import { getHeaders } from '../auth'

export function isTyping(props, chatId, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/typing/`,
        {},
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {});
}