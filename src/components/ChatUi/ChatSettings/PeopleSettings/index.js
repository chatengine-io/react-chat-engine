import React from 'react';

import Person from './Person'
import PersonForm from './PersonForm'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class PeopleList extends React.Component {
    state = {
        collapsed: false,
        hovered: false
    }

    renderChatPeople(people, chat) {
        return people.map((chatPerson, index) => {
            return (
                <Person 
                    key={`person_${index}`} 
                    person={chatPerson.person}
                    conn={this.props} 
                    chat={chat} 
                />
            )
        })
    }
  
    render() {
        const { chats, activeChat } = this.props

        if (!chats || !activeChat || !chats[activeChat] || chats[activeChat].is_direct_chat) { return <div /> }

        const chat = chats[activeChat]

        return (
            <div style={{ borderTop: '1px solid #f0f0f0' }}>
                <div 
                    onMouseEnter={() => this.setState({ hovered: true })}
                    onMouseLeave={() => this.setState({ hovered: false })}
                    onClick={() => this.setState({ collapsed: !this.state.collapsed })}
                    style={this.state.hovered ? { backgroundColor: '#f0f0f0', cursor: 'pointer' } : {}}
                    className='ce-section-title-container ce-person-title-container'
                >
                    <div
                        className='ce-section-title ce-people-title'
                        style={{ fontSize: '17px', padding: '12px', fontWeight: '600' }}>
                        People
                    </div>

                    {
                        this.state.collapsed ?
                        <LeftOutlined style={styles.collapseIcon} /> :
                        <DownOutlined style={styles.collapseIcon} />
                    }
                </div>

                {
                    !this.state.collapsed &&
                    <div>
                        <div style={{ height: '12px' }} />

                        { this.renderChatPeople(chat.people, chat) }

                        <div style={{ height: '12px' }} />

                        {
                            this.props && chat && this.props.userName === chat.admin.username &&
                            <PersonForm conn={this.props} chat={chat} />
                        }
                    </div>
                }
            </div>
        )
    }
}

const styles = {
    collapseIcon: {
        float: 'right',
        position: 'relative',
        bottom: '30px',
        right: '12px'
    }
}