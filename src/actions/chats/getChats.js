import axios from 'axios'
import * as str from '../../actions'

export function getChats(props) {
    axios.get(
        `${str.getApiUrl(props)}/chats/`,
        { headers: { 
            "Public-Key": props.publicKey,
            "User-Name": props.userName,
            "User-Secret": props.userSecret,
        }}
    )

    .then((response) => {
        if (response.status === 200) {
            props.onGetChats && props.onGetChats(response.data)
        }
    })
    
    .catch((error) => {
        console.log('Fetch Chats Error', error)
    });
}