import React, { useContext, useState, useRef, useEffect } from 'react'

import { ChatEngineContext, getChat, getLatestMessages } from 'react-chat-engine'

import { WebSocket } from 'nextjs-websocket'

let socketRef = undefined;
let pingIntervalID = 0;
let timeIntervalID = 0;

const pingInterval = 4000;
const minSocketLag = 15*1000;
const reconnect = Date.now() + 10*1000;

const SocketChild = props => {
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
    } = useContext(ChatEngineContext)

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
        } else if (connecting) {
            props.reRender && props.reRender() 
        }
    }, [connecting])


    useEffect(() => {
        if (shouldPongBy < now) {
            // console.log("Reconnecting socket", shouldPongBy, now)
            setConnecting(true)
            setShouldPongBy(Date.now() + minSocketLag)
        }

        return () => {
            // console.log('Unmounting')
            clearInterval(pingIntervalID)
            clearInterval(timeIntervalID)
        }
    }, [])
    
    // Common Context Handlers

    function onEditChat(chat) {
        if (chats) {
            const newChats = {...chats}
            newChats[chat.id] = chat
            setChats(newChats)
        }

        props.onEditChat && props.onEditChat(chat)
    }

    function onGetChat(chat) {
        if (activeChat === null) {
            setActiveChat(chat.id)
        }

        setChats(_.mapKeys([chat], 'id'))
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
    
        getChat(conn, props.chatID, (chat) => onGetChat(chat))
    
        if (Date.now() > reconnect) {
            setSendingMessages({})
            getLatestMessages(
                conn, props.chatID, 45,
                (id, list) => {
                    setMessages({...messages, ..._.mapKeys(list, 'created')})
                }
            )
        }

        props.onConnect && props.onConnect(conn)
    }
    
    // Socket Events

    function handleEvent(event) {
        const eventJSON = JSON.parse(event)

        if (eventJSON.action === 'pong') {
            setShouldPongBy(Date.now() + minSocketLag)

        } else if (eventJSON.action === 'login_error') {
            console.log(
                `Your chat auth credentials were not correct: \n
                Project ID: ${props.projectID} \n
                Chat ID: ${props.chatID} \n
                Access Key: ${props.chatAccessKey}\n
                Double check these credentials to make sure they're correct.\n
                If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
            )

            setConn(undefined); setCreds(undefined);

            props.onFailAuth && props.onFailAuth(conn)

        } else if (eventJSON.action === 'edit_chat') {
            onEditChat(eventJSON.data)
            
        } else if (eventJSON.action === 'delete_chat') {
            const chat = eventJSON.data 

            if (chats) {
                chats[chat.id] = undefined
                
                setChats(chats)
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
                newMessages[message.created] = message
                setMessages(newMessages)
            }

            props.onNewMessage && props.onNewMessage(id, message)

        } else if (eventJSON.action === 'edit_message') {
            const { id, message } = eventJSON.data
            
            if (id === activeChat) {
                messages[message.created] = message
                setMessages(messages)
            }

            props.onEditMessage && props.onEditMessage(id, message)

        } else if (eventJSON.action === 'delete_message') {
            const { id, message } = eventJSON.data

            if (id === activeChat) {
                messages[message.created] = undefined
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

    function onClose() { setConnecting(true) }

    const { development, publicKey, projectID, chatID, chatAccessKey } = props 
    const wsStart = development ? 'ws://' : 'wss://'
    const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'
    const project = publicKey ? publicKey : projectID

    return <WebSocket 
        reconnect={true}
        childRef={ref => socketRef = ref}
        url={`${wsStart}${rootHost}/chat/?projectID=${project}&chatID=${chatID}&accessKey=${chatAccessKey}`}
        onOpen={onConnect.bind(this, props)}
        onClose={onClose.bind(this)}
        onMessage={handleEvent.bind(this)}
        reconnectIntervalInMilliSeconds={3000}
    />
}

export default SocketChild