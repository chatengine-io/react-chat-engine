import React, { Component } from 'react'

import { Avatar } from 'react-chat-engine'

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

    getOtherPerson(people) {
        return people.find(person => person.person.username !== this.props.creds.userName);
    }

    render() {
        const { chat, creds } = this.props

        if (!chat) { return <div /> }

        const topPeople = chat.people.slice(0, 3)
        const otherPerson = this.getOtherPerson(chat.people)
        
        return (
            <div className='ce-chat-settings-container'>
                <div className='ce-chat-avatars-row'>
                    { topPeople.length === 1 && this.renderOnePerson(topPeople) }
                    
                    { chat.is_direct_chat && otherPerson && this.renderOnePerson([otherPerson]) }

                    { !chat.is_direct_chat && otherPerson && topPeople.length === 2 && this.renderTwoPeople(topPeople) }

                    { !chat.is_direct_chat && otherPerson && topPeople.length === 3 && this.renderThreePeople(topPeople) }
                </div>

                {
                    chat.is_direct_chat && otherPerson ?
                    <div style={{ 
                        paddingTop: '55px',
                        paddingBottom: '7px',
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'center',
                        border: '0px solid white',
                        width: '100%',
                    }}>
                        { otherPerson.person.username }
                    </div> :
                    <TitleForm chat={chat} creds={creds} />
                }
            </div>
        )
    }
}