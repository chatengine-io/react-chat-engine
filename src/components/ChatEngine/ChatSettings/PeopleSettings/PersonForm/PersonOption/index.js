import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'react-chat-engine'


const PersonOption = props => {
    const [focused, setFocused] = useState(false)

    const { avatar, username } = props.person 

    return (
        <div 
            id={`ce-username-option-${username}`}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
            onClick={() => props.onClick && props.onClick()}
            style={{ ...styles.option, ...{ backgroundColor: focused ? '#f5f5f5' : 'white'} }}
        >
            <div>
                <Avatar username={username} avatar={avatar} />
            </div>

            <div style={{ display: 'flex', padding: '12px 4px' }}>
                {props.person.username}
            </div>
        </div>
    );
}

export default PersonOption

const styles = {
  option: {
    padding: '4px 16px',
    cursor: 'pointer',
    fontSize: '15px',
    display: 'flex'
  },
}

PersonOption.propTypes = {
    person: PropTypes.object,
}