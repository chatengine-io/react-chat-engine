import React, { Component } from 'react'

import { removePerson } from 'react-chat-engine'

import Avatar from '../../components/Avatar'
import { Button } from '../../components/Button'

export default class Person extends Component {
    state = {
        selected: false
    }

    onRemovePerson() {
        removePerson(
            this.props.creds,
            this.props.chat.id,
            this.props.person.username
        )
    }

    renderPersonText(person) {
        if (person.first_name !== null) {
            return `${person.first_name}${person.last_name ? ` ${person.last_name}` : ''}`
        } else {
            return person.username
        }
    }

    render() {
        const { person, chat, creds } = this.props

        if (!person || !chat) { return <div /> }

        const { admin } = chat

        return (
            <div 
                className='ce-person-container'
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >
                <div 
                    className='ce-person-avatar'
                    style={{ padding: '2px', height: '0px' }}
                >
                    <Avatar username={person.username} avatar={person.avatar} />
                </div>

                <div
                    className='ce-person-text'
                    style={{ paddingLeft: '52px', height: '44px', position: 'relative', top: '10px', fontSize: '15px' }}
                >
                    { this.renderPersonText(person) }
                </div>

                {
                    this.state.selected && (creds.userName === admin.username) && (person.username !== admin.username) &&
                    <div
                        className='ce-delete-chat' 
                        style={{ float: 'right', height: '0px', position: 'relative', bottom: '44px'}}
                    >
                        <Button 
                            theme='danger'
                            icon='delete'
                            onClick={() => this.onRemovePerson()}
                        />
                    </div>
                }
            </div>
        )
    }
}
