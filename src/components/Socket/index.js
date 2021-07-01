import React, { useContext, useState, useEffect, useRef } from 'react'

import { ChatEngineContext } from '../Context'

import { getLatestChats, getLatestMessages, readMessage } from 'react-chat-engine'
import { getOrCreateSession } from './getOrCreateSession'

import { WebSocket } from 'nextjs-websocket'


const Socket = props => {
    const didMountRef = useRef(false)
    const [sessionToken, setSessionToken] = useState('')
    const [reconnect, reset] = useState(Date.now() + 10000)
    const {
      connecting, setConnecting,
      conn, setConn, setCreds,
      chats, setChats,
      messages, setMessages,
      sendingMessages, setSendingMessages,
      activeChat, setActiveChat,
      typingCounter, setTypingCounter,
    } = useContext(ChatEngineContext)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
            getOrCreateSession(
                props, 
                data => setSessionToken(data.token)
            )
        } else if (connecting) {
            const temp = sessionToken
            setSessionToken('')
            setTimeout(() => {
                setSessionToken(temp)
            }, 500)
        }
        
    }, [connecting])

    function sortChats(chats) {
        return Object.values(chats).sort((a, b) => { 
            const aDate = a.last_message.created ? new Date(a.last_message.created) : new Date(a.created)
            const bDate = b.last_message.created ? new Date(b.last_message.created) : new Date(b.created)
            return new Date(bDate) - new Date(aDate); 
        })
    }

    // Common Context Handlers

    function onEditChat(chat) {
        if (chats) {
            const newChats = {...chats}
            newChats[chat.id] = chat
            setChats(newChats)
        }

        props.onEditChat && props.onEditChat(chat)
    }

    function onConnect(conn) {
        console.log('connected')
        setConn(conn); setCreds(conn);
        setConnecting(false)

        getLatestChats(conn, 25, (chats) => setChats(_.mapKeys(chats, 'id')))

        if (Date.now() > reconnect) { // If this wasn't the first connection
            setSendingMessages({})
            getLatestMessages(
                conn, activeChat, 45,
                (id, list) => {
                    setMessages({...messages, ..._.mapKeys(list, 'id')})
                }
            )
        }
        
        props.onConnect && props.onConnect(conn)
    }
    
    // Socket Events

    function handleEvent(event) {
        const eventJSON = JSON.parse(event)
        console.log(eventJSON.action)

        if (eventJSON.action === 'login_success') {
            onAuthenticate(props)

        } else if (eventJSON.action === 'login_error') {
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

        } else if (eventJSON.action === 'new_chat') {
            const chat = eventJSON.data
            
            if (chats) {
                const newChats = {...chats}
                newChats[chat.id] = chat
                setChats(newChats)
                setActiveChat(chat.id)
            }

            props.onNewChat && props.onNewChat(eventJSON.data)

        } else if (eventJSON.action === 'edit_chat') {
            onEditChat(eventJSON.data)
            
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
            onEditChat(eventJSON.data)
            
            props.onAddPerson && props.onAddPerson(eventJSON.data)

        } else if (eventJSON.action === 'remove_person') {
            onEditChat(eventJSON.data)

            props.onRemovePerson && props.onRemovePerson(eventJSON.data)

        } else if (eventJSON.action === 'new_message') {
            const { id, message } = eventJSON.data

            if (typeof message.custom_json === "string" && message.custom_json.indexOf('sender_id') !== -1) {
                sendingMessages[JSON.parse(message.custom_json).sender_id] = undefined
                setSendingMessages(sendingMessages)
            }
        
            if (id === activeChat) {
                const newMessages = {...messages}
                newMessages[message.id] = message
                setMessages(newMessages)
            }
          
            if (message.sender_username !== props.userName) {
                readMessage(conn, activeChat, message.id, (chat) => onEditChat(chat))
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
            let newTypingCounter = {...typingCounter}
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

    function onClose() { 
        setConnecting(true) 
        console.log('disconnected')
    }

    const { development } = props 
    const wsStart = development ? 'ws://' : 'wss://'
    const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'

    if (sessionToken === '') return <div />

    return <WebSocket 
        reconnect={true}
        url={`${wsStart}${rootHost}/person_v3/?session_token=${sessionToken}`}
        onOpen={onConnect.bind(this, props)}
        onClose={onClose.bind(this)}
        onMessage={handleEvent.bind(this)}
        reconnectIntervalInMilliSeconds={3000}
    />
}

export default Socket