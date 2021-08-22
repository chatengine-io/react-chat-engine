import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getLatestMessages(props, chatId, count, callback) {
    if (!getHeaders(props)) return;

    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/latest/${count}/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        props.onGetMessages && props.onGetMessages(chatId, response.data)

        callback && callback(chatId, response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Latest Messages Error', error)
    });
}