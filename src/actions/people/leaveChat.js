import axios from 'axios'
import * as str from '..'
import { getHeaders } from '../auth'

export function leaveChat(props, chatId, callback) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { headers: getHeaders(props)}
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Person Error', error)
    });
}