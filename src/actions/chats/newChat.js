import axios from 'axios'
import * as str from '../../actions'

export function newChat(props, data, callback) {
    axios.post(
        `${str.getApiUrl(props)}/chats/`,
        data, 
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
        console.log('New Chat Error', error)
    });
}