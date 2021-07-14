import axios from 'axios'
import * as str from '../../../actions'
import { getHeaders } from '../../../actions/auth'

export function getOrCreateSession(props, callback, errorFunc) {
    axios.get(
        `${str.getApiUrl(props)}/users/me/session/`,
        { headers: getHeaders(props) }
    )

        .then((response) => {
            callback && callback(response.data)
        })

        .catch((error) => {
            console.log('Get or Create Session Error', error)
            errorFunc && errorFunc()
        });
}