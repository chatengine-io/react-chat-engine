import axios from 'axios'
import * as str from '..'

export function editMyData(props, data, callback) {
    axios.patch(
        `${str.getApiUrl(props)}/chats/me/`,
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
        console.log('Edit Myself Error', error)
    });
}