import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getChat(props, chatId, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Get Chat Error', error)
    });
}