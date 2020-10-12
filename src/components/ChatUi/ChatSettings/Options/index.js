import React from 'react'

import { Button } from '../../components/Button'

import { deleteChat } from 'react-chat-engine'

export default class Options extends React.Component {
  
    render() {
        const { chat } = this.props 

        if (!chat) { return <div /> }

        return (
            <div>

                <div style={{ fontSize: '17px', padding: '12px', paddingBottom: '0px', fontWeight: '600' }}>
                    Options
                </div>

                <div style={{ height: '12px' }} />

                <Button 
                    value="Delete" 
                    theme='danger'
                    icon='delete'
                    onClick={() => deleteChat(creds, chat.id)}
                    style={{ width: '100%', marginBottom: '12px' }}
                />
            
            </div>
        )
    }
}