import axios from 'axios'
import * as str from '..'

export function getMyData(props, callback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/me/`,
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
        console.log('Get Myself Error', error)
    });
}