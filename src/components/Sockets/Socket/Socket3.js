import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext, getLatestChats, getLatestMessages, readMessage } from 'react-chat-engine'
import { getOrCreateSession } from './getOrCreateSession'

import { getDateTime } from '../../ChatEngine/Utilities/timezone'

import { WebSocket } from 'nextjs-websocket'

let socketRef = undefined;
let pingIntervalID = 0;
let timeIntervalID = 0;

const pingInterval = 4000;
const minSocketLag = 15 * 1000;
const reconnect = Date.now() + 10 * 1000;

const Socket = props => {
    const didMountRef = useRef(false)
    const [sessionToken, setSessionToken] = useState('')

    const [now, setNow] = useState(Date.now())
    const [shouldPongBy, setShouldPongBy] = useState(Date.now() + minSocketLag)

    const {
        connecting, setConnecting,
        conn, setConn, setCreds,
        chats, setChats,
        messages, setMessages,
        sendingMessages, setSendingMessages,
        activeChat, setActiveChat,
        typingCounter, setTypingCounter,
        isBottomVisible
    } = useContext(ChatEngineContext)

    function getSession() {
        getOrCreateSession(
            props,
            data => setSessionToken(data.token),
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
        
                    setConn(undefined); setCreds(undefined);
        
                    props.onFailAuth && props.onFailAuth(conn)
                }
                
                // Try again on error
                setTimeout(() => getSession(), 3000)
            }
        )
    }

    useEffect(() => {
        // Get a session token to connect
        if (!didMountRef.current) {
            didMountRef.current = true
            getSession()

            // Re-render the Socket (i.e. reconnect)
        } else if (connecting) { props.reRender && props.reRender() }
    }, [connecting])

    useEffect(() => {
        if (shouldPongBy < now) {
            setConnecting(true)
            setShouldPongBy(Date.now() + minSocketLag)
        }
    }, [now, shouldPongBy])

    useEffect(() => {
        return () => {
            clearInterval(pingIntervalID)
            clearInterval(timeIntervalID)
        }
    }, [])

    function sortChats(chats) {
        return Object.values(chats).sort((a, b) => {
            const aDate = a.last_message.created ? getDateTime(a.last_message.created, props.offset) : getDateTime(a.created, props.offset)
            const bDate = b.last_message.created ? getDateTime(b.last_message.created, props.offset) : getDateTime(b.created, props.offset)
            return new Date(bDate) - new Date(aDate);
        })
    }    

    function onConnect(conn) {
        setConn(conn)
        setCreds(conn)
        setConnecting(false)

        if (connecting) {
            pingIntervalID = setInterval(() => {
                try {
                    socketRef.sendMessage(JSON.stringify('ping'))
                } catch (e) {
                    console.log('Socker error', e)
                }
            }, pingInterval)

            timeIntervalID = setInterval(() => setNow(Date.now()), 1000)
        }

        getLatestChats(conn, 25, (chats) => setChats(_.mapKeys(chats, 'id')))

        // If this wasn't the first connection
        if (Date.now() > reconnect || conn.renderChatFeed) { // TODO: This conn.renderChatFeed is a hacky patch
            setSendingMessages({})
            getLatestMessages(
                conn, activeChat, 45,
                (id, list) => {
                    // TODO: Maybe move setSendingMessages({}) here
                    setMessages({ ...messages, ..._.mapKeys(list, 'id') })
                }
            )
        }

        props.onConnect && props.onConnect(conn)
    }

    // Event Handlers

    function handleEditChat(chat) {
        if (chats) {
            const newChats = { ...chats }
            newChats[chat.id] = chat
            setChats(newChats)
        }

        props.onEditChat && props.onEditChat(chat)
    }

    function handleEvent(event) {
        const eventJSON = JSON.parse(event)

        if (eventJSON.action === 'pong') {
            setShouldPongBy(Date.now() + minSocketLag)

        } else if (eventJSON.action === 'new_chat') {
            const chat = eventJSON.data

            if (chats) {
                const newChats = { ...chats }
                newChats[chat.id] = chat
                setChats(newChats)
                setActiveChat(chat.id)
            }

            props.onNewChat && props.onNewChat(eventJSON.data)

        } else if (eventJSON.action === 'edit_chat') {
            handleEditChat(eventJSON.data)

        } else if (eventJSON.action === 'delete_chat') {
            const chat = eventJSON.data

            if (chats) {
                chats[chat.id] = undefined

                setChats(chats)

                if (!_.isEmpty(chats)) {
                    const sortedChats = sortChats(chats)
                    setActiveChat(sortedChats[0] ? parseInt(sortedChats[0].id) : 0)
                }
            }

            props.onDeleteChat && props.onDeleteChat(chat)

        } else if (eventJSON.action === 'add_person') {
            handleEditChat(eventJSON.data)

            props.onAddPerson && props.onAddPerson(eventJSON.data)

        } else if (eventJSON.action === 'remove_person') {
            handleEditChat(eventJSON.data)

            props.onRemovePerson && props.onRemovePerson(eventJSON.data)

        } else if (eventJSON.action === 'new_message') {
            const { id, message } = eventJSON.data

            if (typeof message.custom_json === "string" && message.custom_json.indexOf('sender_id') !== -1) {
                sendingMessages[JSON.parse(message.custom_json).sender_id] = undefined
                setSendingMessages(sendingMessages)
            }

            if (parseInt(id) === parseInt(activeChat)) {
                const newMessages = { ...messages }
                newMessages[message.id] = message
                setMessages(newMessages)
            }

            if (message.sender_username !== props.userName && isBottomVisible) {
                readMessage(conn, activeChat, message.id, (chat) => handleEditChat(chat))
            }

            props.onNewMessage && props.onNewMessage(id, message)

        } else if (eventJSON.action === 'edit_message') {
            const { id, message } = eventJSON.data

            if (id === activeChat) {
                messages[message.id] = message
                setMessages(messages)
            }

            props.onEditMessage && props.onEditMessage(id, message)

        } else if (eventJSON.action === 'delete_message') {
            const { id, message } = eventJSON.data

            if (id === activeChat) {
                messages[message.id] = undefined
                setMessages(messages)
            }

            props.onDeleteMessage && props.onDeleteMessage(id, message)

        } else if (eventJSON.action === 'is_typing') {
            const { id, person } = eventJSON.data
            let newTypingCounter = { ...typingCounter }
            newTypingCounter = {
                ...newTypingCounter,
                [id]: {
                    ...newTypingCounter[id],
                    [person]: Date.now()
                }
            }

            setTypingCounter(newTypingCounter)

            props.onTyping && props.onTyping(id, person)
        }
    }

    const { development } = props
    const wsStart = development ? 'ws://' : 'wss://'
    const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'

    if (sessionToken === '') return <div />

    return (
        <div>
            {/* <DataLoader /> */}

            <WebSocket
                reconnect={true}
                childRef={ref => socketRef = ref}
                url={`${wsStart}${rootHost}/person_v3/?session_token=${sessionToken}`}
                onOpen={onConnect.bind(this, props)}
                onClose={() => setConnecting(true)}
                onMessage={handleEvent.bind(this)}
                reconnectIntervalInMilliSeconds={3000}
            />
        </div>
    )
}

export default Socket