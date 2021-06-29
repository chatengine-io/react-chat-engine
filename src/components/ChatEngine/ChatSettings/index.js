import React, { useContext } from 'react'

import { ChatEngineContext } from 'react-chat-engine'

import PeopleSettings from './PeopleSettings'
import PhotosSettings from './PhotosSettings'
import OptionsSettings from './OptionsSettings'
import ChatSettingsTop from './ChatSettingsTop'

const ChatSettings = props => {
    const { conn, chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 

    if (conn === null) return <div />

    return (
        <div style={styles.settingsContainer} className='ce-settings'>
            <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>
                {
                    props.renderChatSettingsTop ?
                    props.renderChatSettingsTop(conn, chat) :
                    <ChatSettingsTop />
                }

                {
                    props.renderPeopleSettings ?
                    props.renderPeopleSettings(conn, chat) :
                    <PeopleSettings />
                }

                {
                    props.renderPhotosSettings ?
                    props.renderPhotosSettings(chat) :
                    <PhotosSettings />
                }

                {
                    conn && chat && conn.userName === chat.admin.username  &&
                    <div>
                        {
                            props.renderOptionsSettings ?
                            props.renderOptionsSettings(conn, chat) :
                            <OptionsSettings />
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatSettings

const styles = {
    settingsContainer: { 
        height: '100%',
        overflow: 'scroll',
        overflowX: 'hidden',
        borderLeft: '1px solid #afafaf',
        backgroundColor: 'white',
        fontFamily: 'Avenir'
    }
}