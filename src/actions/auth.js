export function getHeaders(props) { 
    if (!props) {
        return

    } else if (props.chatID) {
        return { 
            "public-key": props.publicKey ? props.publicKey : props.projectID,
            "chat-id": props.chatID,
            "access-key": props.chatAccessKey,
        }
        
    } else {
        return { 
            "Public-Key": props.publicKey ? props.publicKey : props.projectID,
            "User-Name": props.userName,
            "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
        }
    }
}
