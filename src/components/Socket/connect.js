import ReconnectingWebSocket from 'reconnecting-websocket'

export function connectSocket(props) {    
  const { 
    publicKey, projectID, 
    userName, 
    userPassword, userSecret, 
    development 
  } = props 

  const wsStart = development ? 'ws://' : 'wss://'
  const rootHost = development ? '127.0.0.1:8000' : 'api.chatengine.io'
  
  const project = publicKey ? publicKey : projectID
  const secret = userPassword ? userPassword : userSecret
  
  const rws = new ReconnectingWebSocket(`${wsStart}${rootHost}/person/?publicKey=${project}&username=${userName}&secret=${secret}`)

  rws.onopen = function(event) {
    console.log("Chat Engine connected", event)
    props.onConnect && props.onConnect(props)
  }

  rws.onerror = function(event) {
    console.log("Chat Engine error", event)
    if(event.message === 'TIMEOUT') {
      props.onFailAuth && props.onFailAuth(props)
    }
  }

  rws.onmessage = function(event) {
    const eventJSON = JSON.parse(event.data)

    if (eventJSON.action === 'is_typing') {
      props.onTyping && props.onTyping(eventJSON.data.id, eventJSON.data.person)
    
    } else if (eventJSON.action === 'new_chat') {
      props.onNewChat && props.onNewChat(eventJSON.data)

    } else if (eventJSON.action === 'edit_chat') {
      props.onEditChat && props.onEditChat(eventJSON.data)

    } else if (eventJSON.action === 'delete_chat') {
      props.onDeleteChat && props.onDeleteChat(eventJSON.data)

    } else if (eventJSON.action === 'add_person') {
      props.onAddPerson && props.onAddPerson(eventJSON.data)

    } else if (eventJSON.action === 'remove_person') {
      props.onRemovePerson && props.onRemovePerson(eventJSON.data)

    } else if (eventJSON.action === 'new_message') {
      props.onNewMessage && props.onNewMessage(eventJSON.data.id, eventJSON.data.message)

    } else if (eventJSON.action === 'edit_message') {
      props.onEditMessage && props.onEditMessage(eventJSON.data.id, eventJSON.data.message)

    } else if (eventJSON.action === 'delete_message') {
      props.onDeleteMessage && props.onDeleteMessage(eventJSON.data.id, eventJSON.data.message)
    
    }
  }

  return rws
}