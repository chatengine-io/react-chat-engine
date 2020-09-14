import React, { Component } from 'react'

import { removePerson } from 'react-chat-engine'

export default class Person extends Component {
    state = {
        selected: false
    }

    onRemovePerson() {
        removePerson(
            this.props.creds,
            this.props.chat.id,
            this.props.person.person
        )
    }

    render() {
        const { person } = this.props

        if (!person) { return <div /> }

        return (
            <div 
                onMouseEnter={() => this.setState({ selected: true })}
                onMouseLeave={() => this.setState({ selected: false })}
            >

                { person.person }

                {
                    this.state.selected &&
                    <div>
                        <button onClick={() => this.onRemovePerson()}>Delete</button>
                    </div>
                }
            </div>
        )
    }
}
