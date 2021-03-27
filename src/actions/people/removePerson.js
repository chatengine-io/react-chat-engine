import axios from 'axios'
import * as str from '..'
import { getHeaders } from '../auth'

export function removePerson(props, chatId, userName, callback) {
    axios.put(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { username: userName },
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Person Error', error)
    });
}