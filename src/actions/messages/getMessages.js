import axios from 'axios'
import * as str from '../../actions'

export function getMessages(props, chatId, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/`,
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }}
    )

    .then((response) => {
        // Run hook in Axios on GET requests
        props.onGetMessages && props.onGetMessages(chatId, response.data)

        callback && callback(chatId, response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Messages Error', error)
    });
}