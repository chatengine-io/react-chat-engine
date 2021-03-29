import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function readMessage(props, chatId, messageId, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { last_read: messageId },
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Read Message Error', error)
    });
}