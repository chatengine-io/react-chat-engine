import axios from 'axios'
import * as str from '..'

export function isTyping(props, chatId, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/typing/`,
        {},
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }}
    )

    .then((response) => {
        callback && callback(response.data)
    })
    
    .catch((error) => {});
}