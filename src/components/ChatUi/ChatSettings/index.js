import React, { Component } from 'react'

import PeopleSettings from './PeopleSettings'
import PhotosSettings from './PhotosSettings'
import OptionsSettings from './OptionsSettings'
import ChatSettingsTop from './ChatSettingsTop'

export default class ChatSettingsContainer extends Component {

    render() {
        const { chats, activeChat } = this.props
        const chat = chats && chats[activeChat] 
        
        if (!chat) return <div style={styles.filler} />
        
        return (
            <div style={styles.settingsContainer} className='ce-settings'>

                <div style={{ width: '90%', paddingLeft: '5%' }} className='ce-settings-container'>

                    {
                        this.props.renderChatSettingsTop ?
                        this.props.renderChatSettingsTop(this.props, chat) :
                        <ChatSettingsTop {...this.props} />
                    }

                    {
                        this.props.renderPeopleSettings ?
                        this.props.renderPeopleSettings(this.props, chat) :
                        <PeopleSettings {...this.props} />
                    }

                    {
                        this.props.renderPhotosSettings ?
                        this.props.renderPhotosSettings(chat) :
                        <PhotosSettings {...this.props} />
                    }

                    {
                        this.props && chat && this.props.userName === chat.admin.username  &&
                        <div>
                            {
                                this.props.renderOptionsSettings ?
                                this.props.renderOptionsSettings(this.props, chat) :
                                <OptionsSettings {...this.props} />
                            }
                        </div>
                    }

                </div>

            </div>
        )
    }
}

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