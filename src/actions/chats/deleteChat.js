import axios from 'axios'
import * as str from '../../actions'

export function deleteChat(props, chatId, callback) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userPassword,
        }}
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Chat Error', error)
    });
}