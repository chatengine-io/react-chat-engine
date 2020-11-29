import axios from 'axios'
import * as str from '../../actions'

export function deleteMessage(props, chatId, messageId, callback) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/${messageId}/`,
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword,
        }}
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Delete Messages Error', error)
    });
}