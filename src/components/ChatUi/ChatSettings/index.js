import React, { Component } from 'react'

import People from './People'
import Photos from './Photos'
import Options from './Options'
import ChatSettings from './ChatSettings'

export default class ChatSettingsContainer extends Component {

    render() {
        const { chats, activeChat } = this.props
        const chat = chats && chats[activeChat] 
        
        if (!chat) return <div style={styles.filler} />
        
        return (
            <div style={styles.settingsContainer}>

                <div style={{ width: '90%', paddingLeft: '5%' }}>

                    {
                        this.props.renderChatSettings ?
                        this.props.renderChatSettings(this.props, chat) :
                        <ChatSettings creds={this.props} chat={chat} />
                    }

                    {
                        this.props.renderPeopleSettings ?
                        this.props.renderPeopleSettings(this.props, chat) :
                        <People creds={this.props} chat={chat} />
                    }

                    {
                        this.props.renderPhotosSettings ?
                        this.props.renderPhotosSettings(chat) :
                        <Photos chat={chat} />
                    }

                    {
                        this.props && chat && this.props.userName === chat.admin.username  &&
                        <div>
                            {
                                this.props.renderOptionsSettings ?
                                this.props.renderOptionsSettings(this.props, chat) :
                                <Options creds={this.props} chat={chat} />
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