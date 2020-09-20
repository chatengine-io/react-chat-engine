import axios from 'axios'
import * as str from '../../actions'

export function sendMessage(props, chatId, data, onSend) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/`,
        data,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {
        onSend && onSend(response.data)
    })
    
    .catch((error) => {
        console.log('Send Messages Error', error)
    });
}