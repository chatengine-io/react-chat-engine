export function getApiUrl(props) { 
    if (props.development) {
        return 'http://127.0.0.1:8000'
    }
    return 'https://api.chatengine.io'
}
