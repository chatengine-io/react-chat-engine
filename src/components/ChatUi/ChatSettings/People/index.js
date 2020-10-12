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

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    People
                </div>

                <div style={{ height: '12px' }} />

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