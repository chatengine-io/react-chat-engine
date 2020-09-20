import axios from 'axios'
import * as str from '..'

export function addPerson(props, chatId, userName, onAddPerson) {
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/people/`,
        { username: userName },
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {
        onAddPerson && onAddPerson(response.data)
    })
    
    .catch((error) => {
        console.log('New Person Error', error)
    });
}