import React from 'react';

import { Avatar } from '../../ChatSettingsTop/TitleForm/node_modules/react-chat-engine'


export default class Option extends React.Component {
    state = {
        focused: false
    }

    render() {
        const { avatar, username } = this.props.person 

        return (
            <div 
                onMouseEnter={() => this.setState({ focused: true })}
                onMouseLeave={() => this.setState({ focused: false })}
                onClick={() => this.props.onClick && this.props.onClick()}
                style={{ ...styles.option, ...{ backgroundColor: this.state.focused ? '#f5f5f5' : 'white'} }}
            >
                <div>
                    <Avatar username={username} avatar={avatar} />
                </div>

                <div style={{ display: 'flex', padding: '12px 4px' }}>
                    {this.props.person.username}
                </div>
            </div>
        );
    }
}

const styles = {
  option: {
    padding: '4px 16px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex'
  },
}