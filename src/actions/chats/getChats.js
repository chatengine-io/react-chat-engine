import axios from 'axios'
import * as str from '../../actions'
import { getHeaders } from '../auth'

export function getChats(props, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/`,
        { headers: getHeaders(props) }
    )

    .then((response) => {
        // Run hook in Axios on GET requests
        props.onGetChats && props.onGetChats(response.data)

        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Chats Error', error)
    });
}