import axios from 'axios'
import * as str from '../../actions'

export function getMessages(props, chatId, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userPassword,
        }}
    )

    .then((response) => {
        if (response.status === 200) {
            props.onGetMessages && props.onGetMessages(chatId, response.data)
        }

        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Messages Error', error)
    });
}