import axios from 'axios'
import * as str from '../../actions'

export function readMessage(props, chatId, messageId, onRead) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { last_read: messageId },
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