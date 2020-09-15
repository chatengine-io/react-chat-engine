import axios from 'axios'
import * as str from '../../actions'

export function editMessage(props, chatId, messageId, data) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/`,
        data,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('Delete Messages Error', error)
    });
}