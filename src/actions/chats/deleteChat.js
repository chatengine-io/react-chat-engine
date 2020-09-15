import axios from 'axios'
import * as str from '../../actions'

export function deleteChat(props, chatId) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('Delete Chat Error', error)
    });
}