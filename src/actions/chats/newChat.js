import axios from 'axios'
import * as str from '../../actions'

export function newChat(props, data) {
    axios.post(
        `${str.ROOT_URL}/chats/`,
        data, 
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {})
    
    .catch((error) => {
        console.log('New Chat Error', error)
    });
}