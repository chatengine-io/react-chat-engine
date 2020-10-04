import axios from 'axios'
import * as str from '../../actions'

export function readMessage(props, chatId, messageId, onRead) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/reads/`,
        data,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userPassword,
        }}
    )

    .then((response) => {
        onRead && onRead(response.data)
    })
    
    .catch((error) => {
        console.log('Send Messages Error', error)
    });
}