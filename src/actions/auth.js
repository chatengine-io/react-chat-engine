export function getHeaders(props) { 
    if (props.chatID) {
        return { 
            "public-key": props.publicKey ? props.publicKey : props.projectID,
            "chat-id": props.chatID,
            "access-key": props.chatAccessKey,
        }
    }

    return { 
        "Public-Key": props.publicKey ? props.publicKey : props.projectID,
        "User-Name": props.userName,
        "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
    }
}
