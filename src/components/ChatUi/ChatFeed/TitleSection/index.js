import React, { Component } from 'react'
import ChatList from '../../ChatList';

export default class Title extends Component {
  
    render() {
        const { chat } = this.props

        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%', zIndex: '999' }}>

                <div style={ styles.titleContainer }>
                    
                    <div style={ styles.titleText }>
                        { chat && chat.title }
                    </div>
                    
                    <div style={ styles.subtitleText }>
                        Active 3 mins ago
                    </div>

                </div>

                <div style={ styles.bottomFade } />

            </div>
        );
    }
}

const styles = {
    titleContainer: {
        padding: '18px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
        backgroundColor: 'white'
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    },
    bottomFade: {
        height: '18px',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255, 1), rgba(255,255,255, 0) 100%)'
    }
}
