import axios from 'axios'
import * as str from '../../actions'

export function getOtherPeople(props, chatId, successCallback, errorCallback) {
    axios.get(
        `${str.getApiUrl(props)}/chats/${chatId}/others/`,
        { headers: { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }}
    )

    .then((response) => {
        // Run hook in Axios on GET requests
        props.onGetOtherPeople && props.onGetOtherPeople(chatId, response.data)

        successCallback && successCallback(chatId, response.data)
    })
    
    .catch((error) => {
        console.log('Fetch Other People Error', error)

        errorCallback && errorCallback()
    });
}