import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function editChat(props, chatId, data, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        data, 
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Edit Chat Error', error)
    });
}