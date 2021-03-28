import React, { useContext } from 'react'

import { ChatEngineContext } from '../Context'

import { getChat } from '../../actions/chats'

import { WebSocket } from 'nextjs-websocket'

const ChatSocket = props => {
    const {
      setConnecting,
      conn, setConn,
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
        setActiveChat(chat.id)

        setChats(_.mapKeys([chat], 'id'))
    }

    function onConnect(conn) {
        setConn(conn)
        setConnecting(false)
    
        getChat(conn, props.chatID, (chat) => onGetChat(chat)) // TODO: Semi-redundant request
    
        props.onConnect && props.onConnect(conn)
    }
    
    // Socket Events

    function handleEvent(event) {
        const eventJSON = JSON.parse(event)

        if (eventJSON.action === 'login_error') {
            console.log(
                `Your chat auth credentials were not correct: \n
                Project ID: ${props.projectID} \n
                Chat ID: ${props.chatID} \n
                Access Key: ${props.accessKey}\n
                Double check these credentials to make sure they're correct.\n
                If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
            )

            setConn(undefined)

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

            if (newTypingCounter[id] && newTypingCounter[id][person]) {
                newTypingCounter = {
                    ...newTypingCounter,
                    [id]: {
                        ...newTypingCounter[id],
                        [person]: newTypingCounter[id][person] + 1
                    }
                }

            } else {
                newTypingCounter = {
                    ...newTypingCounter,
                    [id]: {
                        ...newTypingCounter[id],
                        [person]: 1
                    }
                }
            }
                
            setTypingCounter(newTypingCounter)
                
            props.onTyping && props.onTyping(id, person)
        }
    }

    function onClose() { setConnecting(true) }

    // Render
    
    const { 
        publicKey, projectID, 
        chatID, accessKey, 
        development 
    } = props 
    
    const wsStart = development ? 'ws://' : 'wss://'
    const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'
    
    const project = publicKey ? publicKey : projectID

    return <WebSocket 
        url={`${wsStart}${rootHost}/chat/?projectID=${project}&chatID=${chatID}&accessKey=${accessKey}`}
        onOpen={() => onConnect(props)}
        onClose={onClose.bind(this)}
        onMessage={handleEvent.bind(this)}
        reconnectIntervalInMilliSeconds={3000}
    />
}

export default ChatSocket