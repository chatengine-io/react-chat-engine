import axios from 'axios'
import * as str from '../../actions'

export function readMessage(props, chatId, messageId, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { last_read: messageId },
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }}
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Send Messages Error', error)
    });
}