import React, { Component } from 'react'

import { Avatar } from './TitleForm/node_modules/react-chat-engine'

import TitleForm from './TitleForm'

export default class ChatSettingsTop extends Component {

    renderOnePerson(people) {
        return (
            <div style={{ width: '100%', paddingTop: '14px' }}>
                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 22px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[0].person.username} 
                        avatar={people[0].person.avatar}
                    />
                </div>
            </div>
        )
    }

    renderTwoPeople(people) {
        return (
            <div style={{ width: '100%', paddingTop: '14px' }}>
                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 22px - 15px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[0].person.username} 
                        avatar={people[0].person.avatar}
                    />
                </div>

                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 44px - 22px + 15px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[1].person.username} 
                        avatar={people[1].person.avatar}
                    />
                </div>
            </div>
        )
    }

    renderThreePeople(people) {
        return (
            <div style={{ width: '100%', paddingTop: '14px' }}>
                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 22px - 24px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[0].person.username}
                        avatar={people[0].person.avatar}
                    />
                </div>

                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 24px - 44px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[1].person.username} 
                        avatar={people[1].person.avatar}
                    />
                </div>

                <div style={{ float: 'left', position: 'relative', left: 'calc(50% - 22px - 44px - 44px + 24px)' }}>
                    <Avatar 
                        show_online={false} 
                        username={people[2].person.username}
                        avatar={people[2].person.avatar}
                    />
                </div>
            </div>
        )
    }

    render() {
        const { chat, creds } = this.props
        const topPeople = chat ? chat.people.slice(0, 3) : []
        
        return (
            <div className='ce-chat-settings-container'>
                <div className='ce-chat-avatars-row'>
                    { topPeople.length === 1 && this.renderOnePerson(topPeople) }
                    
                    { topPeople.length === 2 && this.renderTwoPeople(topPeople) }

                    { topPeople.length === 3 && this.renderThreePeople(topPeople) }
                </div>

                <TitleForm chat={chat} creds={creds} />
            </div>
        )
    }
}