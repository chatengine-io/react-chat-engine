import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function editMessage(props, chatId, messageId, data, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/`,
        data,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Messages Error', error)
    });
}