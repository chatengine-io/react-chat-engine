import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getOrCreateChat(props, data, callback) {
    axios.put(
        `${str.getApiUrl(props)}/chats/`,
        data,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Get or Create Chat Error', error)
    });
}