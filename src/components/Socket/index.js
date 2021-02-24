import React, { Component } from 'react'
export default class Socket extends Component {
    state = {
        client: undefined,
        props: null
    }

    handleEvent(event) {
        const { props } = this
        const eventJSON = JSON.parse(event.data)

        if (eventJSON.action === 'login_error') {
            console.log(
                `Your login credentials were not correct: \n
                Project ID: ${props.projectID} \n
                Username: ${props.userName} \n
                User Secret: ${props.userSecret}\n
                Double check these credentials to make sure they're correct.\n
                If all three are correct, try resetting the username and secret in the Online Dashboard or Private API.`
            )

        } else if (eventJSON.action === 'is_typing') {
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

    onClose() { this.props.onFailAuth && this.props.onFailAuth(this.props) }

    render() {
        const { 
            publicKey, projectID, 
            userName, 
            userPassword, userSecret, 
            development 
        } = this.props 
        
        const rootHost = development ? 'ws://127.0.0.1:8000' : 'wss://api.chatengine.io'
        const project = publicKey ? publicKey : projectID
        const secret = userPassword ? userPassword : userSecret

        if (!this.state.client) {
            console.log(`${rootHost}/person/?publicKey=${project}&username=${userName}&secret=${secret}`)
            var W3CWebSocket = require('websocket').w3cwebsocket;
            console.log('here')
            var client = new W3CWebSocket(`${rootHost}/person/?publicKey=${project}&username=${userName}&secret=${secret}`);
            console.log('1')
            client.onerror = () => console.log('Error')
            client.onopen = () => this.props.onConnect && this.props.onConnect(this.props)
            client.onclose = this.onClose.bind(this)
            client.onmessage = this.handleEvent.bind(this)
            this.setState({ client })
            console.log(client)
        }

        return <div />
        // return <Websocket 
        //     url={`${wsStart}${rootHost}/person/?publicKey=${project}&username=${userName}&secret=${secret}`}
        //     onOpen={() => this.props.onConnect && this.props.onConnect(this.props)}
        //     onClose={this.onClose.bind(this)}
        //     onMessage={this.handleEvent.bind(this)}
        // />
    }
}
