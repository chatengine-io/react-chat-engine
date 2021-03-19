import React from 'react'

import PeopleSettings from './PeopleSettings'
import PhotosSettings from './PhotosSettings'
import OptionsSettings from './OptionsSettings'
import ChatSettingsTop from './ChatSettingsTop'

const ChatSettings = props => {
    const { chats, activeChat } = props
    const chat = chats && chats[activeChat] 
    
    if (!chat) return <div style={styles.filler} />
    
    return (
        <div style={styles.settingsContainer} className='ce-settings'>
            <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>
                {
                    props.renderChatSettingsTop ?
                    props.renderChatSettingsTop(props, chat) :
                    <ChatSettingsTop {...props} />
                }

                {
                    props.renderPeopleSettings ?
                    props.renderPeopleSettings(props, chat) :
                    <PeopleSettings {...props} />
                }

                {
                    props.renderPhotosSettings ?
                    props.renderPhotosSettings(chat) :
                    <PhotosSettings {...props} />
                }

                {
                    props && chat && props.userName === chat.admin.username  &&
                    <div>
                        {
                            props.renderOptionsSettings ?
                            props.renderOptionsSettings(props, chat) :
                            <OptionsSettings {...props} />
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