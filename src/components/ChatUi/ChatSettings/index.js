import React, { Component } from 'react'

import { deleteChat } from 'react-chat-engine'

import { Row, Col } from 'react-grid-system'

import Avatar from '../components/Avatar'
import { Button } from '../components/Button'

import TitleForm from './TitleForm'
import People from './People'

export default class ChatList extends Component {

    renderOnePerson(people) {
        return (
            <Col xs={6} style={{ paddingTop: '22px', height: '80px' }}>
                <div style={{ margin: 'auto', width: '33%' }}>
                    <Avatar text={people[0].person} />
                </div>
            </Col>
        )
    }

    renderTwoPeople(people) {
        return (
            <Col xs={6} style={{ paddingTop: '22px', height: '80px' }}>
                <div style={{ margin: 'auto', width: '50%' }}>
                    <Avatar 
                        text={people[0].person} 
                        style={{ float: 'left', position: 'relative', right: '5px' }}
                    />
                    <Avatar 
                        text={people[1].person} 
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
                        text={people[0].person} 
                        style={{ position: 'relative', top: '10px' }}
                    />
                    <Avatar text={people[1].person} 
                        style={{ float: 'right', position: 'relative', right: '8px', bottom: '56px', zIndex: 11 }}
                    />
                    <Avatar 
                        text={people[2].person} 
                        style={{ float: 'right', position: 'relative', left: '5px', bottom: '78px', zIndex: 11 }}
                    />
                </div>
            </Col>
        )
    }

    render() {

        const { chat, creds } = this.props
        const topPeople = chat ? chat.people.slice(0, 3) : []

        if (!chat) { return <div style={{ display: 'flex', width: '90%', paddingLeft: '5%', borderLeft: '1px solid #afafaf' }} /> }
        
        return (
            <div style={{ backgroundColor: 'white' }}>
                <div style={{ height: '100%', maxHeight: '100vh', width: '90%', paddingLeft: '5%', borderLeft: '1px solid #afafaf' }}>

                    <Row>

                        <Col xs={3} />

                        { topPeople.length == 1 && this.renderOnePerson(topPeople) }
                        { topPeople.length == 2 && this.renderTwoPeople(topPeople) }
                        { topPeople.length == 3 && this.renderThreePeople(topPeople) }
                        
                        <Col xs={3} />

                    </Row>

                    <TitleForm chat={chat} creds={creds} />

                    <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                        People
                    </div>

                    <div style={{ height: '12px' }} />

                    <People creds={creds} chat={chat} />

                    {
                        chat.admin === creds.userName &&
                        <div>

                            <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                                Options
                            </div>

                            <div style={{ height: '12px' }} />

                            <Button 
                                value="Delete" 
                                theme='danger'
                                icon='delete'
                                onClick={() => deleteChat(creds, chat.id)}
                                style={{ width: '100%', marginBottom: '12px' }}
                            />

                        </div>
                    }

                </div>

            </div>
        )
    }
}
