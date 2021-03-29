import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function newChat(props, data, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/`,
        data, 
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('New Chat Error', error)
    });
}