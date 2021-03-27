import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function deleteChat(props, chatId, callback) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Chat Error', error)
    });
}