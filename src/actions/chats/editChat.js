import axios from 'axios'
import * as str from '../../actions'

export function editChat(props, chatId, data, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/${chatId}/`,
        data, 
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
        console.log('Edit Chat Error', error)
    });
}