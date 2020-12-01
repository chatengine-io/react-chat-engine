import axios from 'axios'
import * as str from '../../actions'

export function getChats(props, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/`,
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }}
    )

    .then((response) => {
        // Run hook in Axios on GET requests
        props.onGetChats && props.onGetChats(response.data)

        callback && callback(response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Chats Error', error)
    });
}