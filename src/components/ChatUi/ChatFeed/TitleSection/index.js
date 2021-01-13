import React, { Component } from 'react'

import { timeSinceDate } from '../../Utilities/dateToString'

export default class Title extends Component {
  
    render() {
        const { chat } = this.props

        if (!chat) { return <div /> }

        return (
            <div 
                className='ce-chat-title'
                style={{ position: 'absolute', top: '0px', width: '100%', zIndex: '1' }}
            >
                <div style={styles.titleContainer} className='ce-chat-title-container'>  
                    <div style={styles.titleText} className='ce-chat-title-text'>
                        { chat && chat.title }
                    </div>
                    
                    <div style={styles.subtitleText} className='ce-chat-subtitle-text'>
                        Active {timeSinceDate(chat.last_message.created)}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    mobileSection: {
        textAlign: 'center', 
        padding: '30px 0px', 
        backgroundColor: 'rgb(256, 256, 256, 0.92)',
        border: '1px solid rgb(256, 256, 256, 0.92)'
    },
    titleContainer: {
        width: '100%',
        padding: '18px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
        backgroundColor: 'rgb(256, 256, 256, 0.92)'
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    }
}
