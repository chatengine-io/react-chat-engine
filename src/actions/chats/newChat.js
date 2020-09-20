import axios from 'axios'
import * as str from '../../actions'

export function newChat(props, data, onNewChat) {
    axios.post(
        `${str.getApiUrl(props)}/chats/`,
        data, 
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {
        onNewChat && onNewChat(response.data)
    })
    
    .catch((error) => {
        console.log('New Chat Error', error)
    });
}