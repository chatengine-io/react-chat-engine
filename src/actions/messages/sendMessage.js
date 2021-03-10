import axios from 'axios'
import * as str from '../../actions'

export function sendMessage(props, chatId, data, callback) {
    let formdata = new FormData()
    if(data.files) {
        for (let i = 0; i < data.files.length; i++) { 
            formdata.append('attachments', data.files[i], data.files[i].name)
        }
    }
    formdata.append('text', data.text)
    formdata.append('sender_username', data.sender_username)
    formdata.append('custom_json', JSON.stringify(data.custom_json ? data.custom_json : {}))
    
    axios.post(
        `${str.getApiUrl(props)}/chats/${chatId}/messages/`,
        formdata,
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
        console.log('Send Messages Error', error)
    });
    
}