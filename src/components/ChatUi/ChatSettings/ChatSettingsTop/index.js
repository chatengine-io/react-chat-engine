import React, { useContext } from 'react'

import { ChatEngineContext } from '../../context'

import { Avatar } from 'react-chat-engine'

import TitleForm from './TitleForm'

const ChatSettingsTop = props => {
    const { conn } = useContext(ChatEngineContext)
    const { chat } = props
    const topPeople = chat.people.slice(0, 3)
    const otherPerson = getOtherPerson(chat.people)

    function renderOnePerson(people) {
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

    function renderTwoPeople(people) {
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

    function renderThreePeople(people) {
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

    function getOtherPerson(people) {
        return people.find(person => person.person.username !== conn.userName);
    }
    
    return (
        <div className='ce-chat-settings-container'>
            <div className='ce-chat-avatars-row'>
                { topPeople.length === 1 && renderOnePerson(topPeople) }
                
                { chat.is_direct_chat && otherPerson && renderOnePerson([otherPerson]) }

                { !chat.is_direct_chat && otherPerson && topPeople.length === 2 && renderTwoPeople(topPeople) }

                { !chat.is_direct_chat && otherPerson && topPeople.length === 3 && renderThreePeople(topPeople) }
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
                <TitleForm chat={chat} conn={conn} />
            }
        </div>
    )
}

export default ChatSettingsTop
