import axios from 'axios'
import * as str from '..'

export function addPerson(props, chatId, userName, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { username: userName },
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
        console.log('New Person Error', error)
    });
}