import React, { Component } from 'react'

import People from './People'
import Photos from './Photos'
import Options from './Options'
import ChatSettings from './ChatSettings'

export default class ChatSettingsContainer extends Component {

    render() {
        const { chat, creds } = this.props
        
        if (!chat) return <div style={styles.filler} />
        
        return (
            <div style={styles.settingsContainer}>

                <div style={{ width: '90%', paddingLeft: '5%' }}>

                    {
                        this.props.renderChatSettings ?
                        this.props.renderChatSettings(creds, chat) :
                        <ChatSettings creds={creds} chat={chat} />
                    }

                    {
                        this.props.renderPeopleSettings ?
                        this.props.renderPeopleSettings(creds, chat) :
                        <People creds={creds} chat={chat} />
                    }

                    {
                        this.props.renderPhotosSettings ?
                        this.props.renderPhotosSettings(chat) :
                        <Photos creds={creds} chat={chat} />
                    }

                    {
                        creds && chat && creds.userName === chat.admin.username  &&
                        <div>
                            {
                                this.props.renderOptionsSettings ?
                                this.props.renderOptionsSettings(creds, chat) :
                                <Options creds={creds} chat={chat} />
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