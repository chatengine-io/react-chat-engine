import axios from 'axios'
import * as str from '..'

export function leaveChat(props, chatId, callback) {
    axios.delete(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
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
        console.log('Delete Person Error', error)
    });
}