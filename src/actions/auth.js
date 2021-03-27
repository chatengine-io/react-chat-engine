export function getHeaders(props) { 
    return { 
        "Public-Key": props.publicKey ? props.publicKey : props.projectID,
        "User-Name": props.userName,
        "User-Secret": props.userPassword ? props.userPassword : props.userSecret,
    }
}
