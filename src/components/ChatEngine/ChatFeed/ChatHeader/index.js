import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import ChatListDrawer from './ChatListDrawer'
import ChatSettingsDrawer from './ChatSettingsDrawer'

import { LoadingOutlined } from '@ant-design/icons'

import { Row, Col } from 'react-grid-system'

import { setConfiguration } from 'react-grid-system';
 
setConfiguration({ maxScreenClass: 'xl', gutterWidth: 0 });

const ChatHeader = () => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)

    const chat = chats ? chats[activeChat] : undefined
    const otherPerson = chat && conn && chat.people.find(person => person.person.username !== conn.userName)
    const title = chat ? (chat.is_direct_chat && otherPerson ? otherPerson.person.username : chat.title) : undefined

    function timeSinceDate(date) {
        if (!date) return ''
        const year = date.substr(0,4)
        const month = date.substr(5,2)
        const day = date.substr(8,2)
        const hour = date.substr(11,2)
        const minute = date.substr(14,2)
        const second = date.substr(17,2)
        var sent = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`)
        sent = sent.toString()
        const dayStr = sent.substr(0, 10)
        const timeStr = sent.substr(15, 6)
        return `${dayStr} at ${timeStr}`
    }

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
                <ChatListDrawer />
            </Col>

            <Col 
                xs={8}
                sm={12}
                style={styles.titleContainer} 
                className='ce-chat-title-container'
            >
                <div 
                    style={styles.titleText} 
                    className='ce-chat-title-text' 
                    id={`ce-chat-feed-title-${title}`}
                >
                    { title ? title : <LoadingOutlined /> }
                </div>
                
                <div style={styles.subtitleText} className='ce-chat-subtitle-text'>
                    {
                        chat ? chat.last_message.created && chat.last_message.created.length > 0 ?
                        `Active ${timeSinceDate(chat.last_message.created)}` :
                        'Say hello!' : 'Loading'
                    }
                </div>
            </Col>

            <Col 
                xs={2} 
                sm={0} 
                style={{ ...styles.mobileOptiom, ...{ right: '6px' } }}
                className='ce-chat-settings-mobile-option'
            >
                <ChatSettingsDrawer />
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
        backgroundColor: 'rgb(256, 256, 256, 0.92)',
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
        overflowX: 'hidden'
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    }
}
