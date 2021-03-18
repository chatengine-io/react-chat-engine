import React from 'react'

import { timeSinceDate } from '../../Utilities/dateToString'

import ChatListDrawer from './ChatListDrawer'
import ChatSettingsDrawer from './ChatSettingsDrawer'

import { Row, Col } from 'react-grid-system'

import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const ChatHeader = props => {
    const { chats, activeChat } = props

    if (!chats || !activeChat || !chats[activeChat]) { return <div /> }

    const chat = chats[activeChat]
    const otherPerson = chat.people.find(person => person.person.username !== props.userName);

    return (
        <Row 
            className='ce-chat-title'
            style={styles.titleSection}
        >
            <Col 
                xs={2} 
                sm={0} 
                style={{ ...styles.mobileOptiom, ...{ left: '6px' } }}
                className='ce-chat-list-mobile-option'
            >
                <ChatListDrawer {...props} />
            </Col>

            <Col 
                xs={8}
                sm={12}
                style={styles.titleContainer} 
                className='ce-chat-title-container'
            >
                <div style={styles.titleText} className='ce-chat-title-text'>
                    { chat.is_direct_chat && otherPerson ? otherPerson.person.username : chat.title }
                </div>
                
                <div style={styles.subtitleText} className='ce-chat-subtitle-text'>
                    {
                        chat.last_message.created && chat.last_message.created.length > 0 ?
                        `Active ${timeSinceDate(chat.last_message.created)}` :
                        'Say hello!'
                    }
                </div>
            </Col>

            <Col 
                xs={2} 
                sm={0} 
                style={{ ...styles.mobileOptiom, ...{ right: '6px' } }}
                className='ce-chat-settings-mobile-option'
            >
                <ChatSettingsDrawer {...props} />
            </Col>
        </Row>
    );
}

export default ChatHeader

const styles = {
    titleSection: { 
        position: 'absolute',
        top: '0px',
        width: '100%',
        zIndex: '1',
        backgroundColor: 'rgb(256, 256, 256, 0.92)'
    },
    mobileOptiom: {
        width: '100%',
        top: '32px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
        overflow: 'hidden'
    },
    titleContainer: {
        width: '100%',
        padding: '18px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    }
}
