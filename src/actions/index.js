
function getApiUrl() { 
    if (process.env.NODE_ENV === 'production') {
        return 'https://api.chatengine.io'
    } else {
        return 'http://127.0.0.1:8000'
    }
}
export const ROOT_URL = getApiUrl()