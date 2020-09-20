import React from 'react';

import Person from './Person'
import PersonForm from './PersonForm'

export default class MessageForm extends React.Component {

    renderPeople(people) {
        return people.map((person, index) => {
            return (
                <Person 
                    key={`person_${index}`} 
                    person={person}
                    creds={this.props.creds} 
                    chat={this.props.chat} 
                />
            )
        })
    }
  
    render() {
        const { creds, chat } = this.props 

        if (!chat) { return <div /> }

        return (
            <div>

                { this.renderPeople(chat.people) }

                <div style={{ height: '12px' }} />

                {
                    chat.admin === creds.userName &&
                    <PersonForm creds={creds} chat={chat} />
                }
            
            </div>
        )
    }
}