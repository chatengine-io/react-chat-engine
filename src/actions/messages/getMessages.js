import axios from 'axios'
import * as str from '../../actions'

export function getMessages(props, chatId) {
    axios.get(
        `${str.ROOT_URL}/chats/${chatId}/messages/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {
        if (response.status === 200) {
            props.onGetMessages && props.onGetMessages(chatId, response.data)
        }
    })
    
    .catch((error) => {
        console.log('Fetch Messages Error', error)
    });
}