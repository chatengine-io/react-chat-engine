import React, { useContext } from 'react'

import { ChatEngineContext } from '../../Context'

import PeopleSettings from './PeopleSettings'
import PhotosSettings from './PhotosSettings'
import OptionsSettings from './OptionsSettings'
import ChatSettingsTop from './ChatSettingsTop'

const ChatSettings = props => {
    const { chats, activeChat } = useContext(ChatEngineContext)  
    const chat = chats && chats[activeChat] 
    
    if (!chat) return <div style={styles.filler} />
    
    return (
        <div style={styles.settingsContainer} className='ce-settings'>
            <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>
                {
                    props.renderChatSettingsTop ?
                    props.renderChatSettingsTop(props, chat) :
                    <ChatSettingsTop {...props} chat={chat} />
                }

                {
                    props.renderPeopleSettings ?
                    props.renderPeopleSettings(props, chat) :
                    <PeopleSettings {...props} chat={chat} />
                }

                {
                    props.renderPhotosSettings ?
                    props.renderPhotosSettings(chat) :
                    <PhotosSettings {...props} chat={chat} />
                }

                {
                    props && chat && props.userName === chat.admin.username  &&
                    <div>
                        {
                            props.renderOptionsSettings ?
                            props.renderOptionsSettings(props, chat) :
                            <OptionsSettings {...props} chat={chat} />
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
        backgroundColor: 'white'
    },
    filler: { 
        display: 'flex',
        width: '90%',
        paddingLeft: '5%',
        borderLeft: '1px solid #afafaf'
    }
}