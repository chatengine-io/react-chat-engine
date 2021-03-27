import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getMessages(props, chatId, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        // Run hook in Axios on GET requests
        props.onGetMessages && props.onGetMessages(chatId, response.data)

        callback && callback(chatId, response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Messages Error', error)
    });
}