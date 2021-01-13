import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system'

import Avatar from '../components/Avatar'

import TitleForm from './TitleForm'

export default class ChatSettings extends Component {

    renderOnePerson(people) {
        return (
            <Col xs={6} style={{ paddingTop: '22px', height: '80px' }}>
                <div style={{ margin: 'auto', width: '33%' }}>
                    <Avatar show_online={false} person={people[0].person} />
                </div>
            </Col>
        )
    }

    renderTwoPeople(people) {
        return (
            <Col xs={6} style={{ paddingTop: '22px', height: '80px' }}>
                <div style={{ margin: 'auto', width: '50%' }}>
                    <Avatar 
                        show_online={false}
                        person={people[0].person} 
                        style={{ float: 'left', position: 'relative', right: '5px' }}
                    />
                    <Avatar 
                        show_online={false}
                        person={people[1].person} 
                        style={{ float: 'right', position: 'relative', left: '5px', bottom: '44px', zIndex: 11 }}
                    />
                </div>
            </Col>
        )
    }

    renderThreePeople(people) {
        return (
            <Col xs={6} style={{ paddingTop: '22px', height: '80px' }}>
                <div style={{ margin: 'auto', width: '50%' }}>
                    <Avatar 
                        show_online={false}
                        person={people[0].person} 
                        style={{ float: 'right', position: 'relative', right: '28px', top: '10px', zIndex: 11 }}
                    />
                    <Avatar 
                        show_online={false}
                        person={people[1].person} 
                        style={{ float: 'right', position: 'relative', right: '14px', bottom: '56px', zIndex: 11 }}
                    />
                    <Avatar 
                        show_online={false}
                        person={people[2].person} 
                        style={{ float: 'right', position: 'relative', left: '5px', bottom: '78px', zIndex: 11 }}
                    />
                </div>
            </Col>
        )
    }

    render() {
        const { chat, creds } = this.props
        const topPeople = chat ? chat.people.slice(0, 3) : []
        
        return (
            <div className='ce-chat-settings-container'>
                <Row className='ce-chat-avatars-row'>
                    <Col xs={3} />

                    { topPeople.length == 1 && this.renderOnePerson(topPeople) }
                    { topPeople.length == 2 && this.renderTwoPeople(topPeople) }
                    { topPeople.length == 3 && this.renderThreePeople(topPeople) }

                    <Col xs={3} />
                </Row>

                <TitleForm chat={chat} creds={creds} />
            </div>
        )
    }
}