import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getChatsByRange(props, from, to, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/range/${from}/${to}/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Chats Range Error', error)
    });
}