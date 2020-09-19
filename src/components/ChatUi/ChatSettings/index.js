import React, { Component } from 'react'

import { deleteChat } from 'react-chat-engine'

import TitleForm from './TitleForm'
import People from './People'

class ChatList extends Component {

    render() {

        const { chat, creds } = this.props

        if (!chat) { return <div/> }
        
        return (
            <div style={{ height: '100vh', borderLeft: '1px solid #afafaf' }}>

                
                
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
