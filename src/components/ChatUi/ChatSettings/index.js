import React, { Component } from 'react'

import { deleteChat } from 'react-chat-engine'

import { Row, Col } from 'react-grid-system'

import Avatar from '../components/Avatar'
import { Button } from '../components/Button'

import TitleForm from './TitleForm'
import People from './People'

class ChatList extends Component {

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

        if (!chat) { return <div/> }
        
        return (
            <div style={{ height: '100vh', borderLeft: '1px solid #afafaf' }}>

                <Row>

                    <Col xs={3} />

                    { topPeople.length == 1 && this.renderOnePerson(topPeople) }
                    { topPeople.length == 2 && this.renderTwoPeople(topPeople) }
                    { topPeople.length == 3 && this.renderThreePeople(topPeople) }
                    
                    <Col xs={3} />

                </Row>

                <TitleForm chat={chat} creds={creds} />

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px' }}>
                    People
                </div>

                <People creds={creds} chat={chat} />

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px' }}>
                    Options
                </div>

                <Button 
                    value="Delete" 
                    onClick={() => deleteChat(creds, chat.id)}
                    style={{ width: '100%', marginBottom: '12px' }}
                />

            </div>
        )
    }
}

export default ChatList;
