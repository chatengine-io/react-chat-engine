import React, { useContext, useEffect, useRef } from 'react'

import { ChatEngineContext, getLatestChats, getLatestMessages } from 'react-chat-engine'
import { getOrCreateSession } from '../getOrCreateSession'

import { getDateTime } from '../../../ChatEngine/Utilities/timezone'


const DataLoader = props => {
    const didMountRef = useRef(false)

    const {
        setConn, 
        setCreds,
        setSessionToken, 
        setChats,
        setActiveChat,
        setMessages,
    } = useContext(ChatEngineContext)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            getSession()
            getLatestChats(props, 25, (chats) => onGetChats(chats))
        }
    })

    function getSession() {
        getOrCreateSession(
            props,
            data => {
                setConn(props);
                setCreds(props);
                setSessionToken(data.token);
            },
            e => {
                if (e.response && e.response.status === 403) {
                    console.log(
                        `Your login credentials were not correct: \n
                        Project ID: ${props.projectID} \n
                        Username: ${props.userName} \n
                        User Secret: ${props.userSecret}\n
                        Double check these credentials to make sure they're correct.\n
                        If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
                    )
                    setConn(undefined); 
                    setCreds(undefined);
                    props.onFailAuth && props.onFailAuth(props)
                }
                setTimeout(() => getSession(), 3000) // Try again
            }
        )
    }

    function sortChats(chats) {
        return Object.values(chats).sort((a, b) => {
            const aDate = a.last_message.created ? getDateTime(a.last_message.created, props.offset) : getDateTime(a.created, props.offset)
            const bDate = b.last_message.created ? getDateTime(b.last_message.created, props.offset) : getDateTime(b.created, props.offset)
            return new Date(bDate) - new Date(aDate);
        })
    }

    function onGetChats(chats) {
        const sortedChats = sortChats(chats)
        const activeChatID = sortedChats[0] ? parseInt(sortedChats[0].id) : 0

        setChats(_.mapKeys(chats, 'id'))
        setActiveChat(activeChatID)

        getLatestMessages(
            props, 
            activeChatID, 
            45,
            (id, list) => {
                setMessages(_.mapKeys(list, 'created'));
            }
        )
    }

    return <div />
}

export default DataLoader