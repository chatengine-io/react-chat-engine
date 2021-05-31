import React, { useContext, useState } from 'react'

import { ChatEngineContext } from '../Context'

import { getChat, getLatestMessages } from 'react-chat-engine'

import { WebSocket } from 'nextjs-websocket'

let socketRef = undefined;
let dt = new Date().getTime();

const ChatSocket = props => {
    const [uuid, setUuid] = useState('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    }))
    const [reconnect, reset] = useState(Date.now() + 10000)
    const {
      setConnecting,
      conn, setConn, setCreds,
      chats, setChats,
      messages, setMessages,
      sendingMessages, setSendingMessages,
      activeChat, setActiveChat,
      typingCounter, setTypingCounter,
    } = useContext(ChatEngineContext)

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

    function onConnect() {
        const { publicKey, projectID, chatID, chatAccessKey } = props 
        const project = publicKey ? publicKey : projectID
        socketRef.sendMessage(JSON.stringify({
            "project-id": project,
            "chat-id": chatID,
            "access-key": chatAccessKey,
        }))
    }

    function onAuthenticate(conn) {
        setConn(conn); setCreds(conn);
        setConnecting(false)
    
        getChat(conn, props.chatID, (chat) => onGetChat(chat))
    
        if (Date.now() > reconnect) {
            getLatestMessages(
                conn, props.chatID, 45,
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

        if (eventJSON.action === 'login_success') {
            onAuthenticate(props)

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
                newMessages[message.id] = message
                setMessages(newMessages)
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

    function onClose() { setConnecting(true) }

    const { development } = props 
    const wsStart = development ? 'ws://' : 'wss://'
    const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'
    return <WebSocket 
        reconnect={true}
        childRef={ref => socketRef = ref}
        url={`${wsStart}${rootHost}/chat_v2/?connection_id=${uuid}`}
        onOpen={onConnect.bind(this)}
        onClose={onClose.bind(this)}
        onMessage={handleEvent.bind(this)}
        reconnectIntervalInMilliSeconds={3000}
    />
}

export default ChatSocket