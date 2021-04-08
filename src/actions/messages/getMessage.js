import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getMessage(props, chatId, messageId, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(chatId, response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Message Error', error)
    });
}