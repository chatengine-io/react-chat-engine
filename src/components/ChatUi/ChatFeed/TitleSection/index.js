import React, { Component } from 'react'

import { timeSinceDate } from '../../Utilities/dateToString'

export default class Title extends Component {
  
    render() {
        const { chat } = this.props

        if (!chat) { return <div /> }

        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%', zIndex: '999' }}>

                <div style={ styles.titleContainer }>
                    
                    <div style={ styles.titleText }>
                        { chat && chat.title }
                    </div>
                    
                    <div style={ styles.subtitleText }>
                        Active { timeSinceDate(chat.last_message.created) }
                    </div>

                </div>

            </div>
        );
    }
}

const styles = {
    titleContainer: {
        padding: '18px',
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
