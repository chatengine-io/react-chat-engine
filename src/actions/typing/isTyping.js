import axios from 'axios'
import * as str from '..'

export function isTyping(props, chatId, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/typing/`,
        {},
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
        console.log('Is Typing Error', error)
    });
}