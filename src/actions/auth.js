export function getHeaders(props) { 
    if (props.chatId) {
        return { 
            "public-key": props.publicKey ? props.publicKey : props.projectID,
            "chat-id": props.chatId,
            "access-key": props.accessKey,
        }
    }

    return { 
        "Public-Key": props.publicKey ? props.publicKey : props.projectID,
        "User-Name": props.userName,
        "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
    }
}
