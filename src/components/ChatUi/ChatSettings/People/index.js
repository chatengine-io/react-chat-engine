import React from 'react';

import Person from './Person'
import PersonForm from './PersonForm'

import { LeftOutlined, DownOutlined } from '@ant-design/icons'

export default class MessageForm extends React.Component {
    state = {
        collapsed: false
    }

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
            <div style={{ borderTop: '1px solid #f0f0f0', paddingBottom: '12px' }}>

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    People
                </div>

                {
                    this.state.collapsed ?
                    <LeftOutlined style={styles.collapseIcon} onClick={() => this.setState({ collapsed: false })} /> :
                    <DownOutlined style={styles.collapseIcon} onClick={() => this.setState({ collapsed: true })} />
                }

                {
                    !this.state.collapsed &&
                    <div>

                        <div style={{ height: '12px' }} />

                        { this.renderPeople(chat.people) }

                        <div style={{ height: '12px' }} />

                        {
                            chat.admin === creds.userName &&
                            <PersonForm creds={creds} chat={chat} />
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
        bottom: '18px'
    }
}