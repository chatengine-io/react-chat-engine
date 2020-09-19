import React, { Component } from 'react'

import { deleteChat } from 'react-chat-engine'

import Avatar from '../components/Avatar'
import TitleForm from './TitleForm'
import People from './People'

class ChatList extends Component {

    renderOnePerson() {
        return (
            <div>One</div>
        )
    }

    renderTwoPeople() {
        return (
            <div>Two</div>
        )
    }

    renderThreePeople() {
        return (
            <div>Three</div>
        )
    }

    render() {

        const { chat, creds } = this.props
        const topPeople = chat ? chat.people.slice(0, 3) : []

        if (!chat) { return <div/> }
        
        return (
            <div style={{ height: '100vh', borderLeft: '1px solid #afafaf' }}>

                { topPeople.length == 1 && this.renderOnePerson() }
                { topPeople.length == 2 && this.renderTwoPeople() }
                { topPeople.length == 3 && this.renderThreePeople() }
                
                <TitleForm 
                    chat={chat} 
                    creds={creds} 
                />


                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px' }}>
                    People
                </div>

                <People creds={creds} chat={chat} />

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px' }}>
                    Options
                </div>

                <button onClick={() => deleteChat(creds, chat.id)}>
                    Delete
                </button>

            </div>
        )
    }
}

export default ChatList;
