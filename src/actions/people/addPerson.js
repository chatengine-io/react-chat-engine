import axios from 'axios'
import * as str from '..'

export function addPerson(props, chatId, userName) {
    axios.post(
        `${str.ROOT_URL}/chats/${chatId}/people/`,
        { username: userName },
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('New Person Error', error)
    });
}