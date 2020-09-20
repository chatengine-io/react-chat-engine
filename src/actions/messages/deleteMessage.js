import axios from 'axios'
import * as str from '../../actions'

export function deleteMessage(props, chatId, messageId) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userPassword,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('Delete Messages Error', error)
    });
}