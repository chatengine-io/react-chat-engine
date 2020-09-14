import axios from 'axios'
import * as str from '../../actions'

export function editChat(props, chatId, data) {
    axios.patch(
        `${str.ROOT_URL}/chats/${chatId}/`,
        data, 
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('Edit Chat Error', error)
    });
}