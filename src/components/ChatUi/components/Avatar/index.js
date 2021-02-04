import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Avatar extends Component {
    state = { avatar: '' }  

    updateImg() {
        const { person } = this.props
        const avatar = (person && person.avatar !== null) ? person.avatar : ''
        
        if (avatar.split('?')[0] !== this.state.avatar.split('?')[0]) {
            this.setState({ avatar })
        }
    }

    componentDidMount() { this.updateImg() }

    componentDidUpdate() { this.updateImg() }

    render() {
        const { person } = this.props
        const customStyle = this.props.style ? this.props.style : {}
        const text = person.username ? person.username.substring(0, 2).toUpperCase() : ''
        const color = stringToColor(person ? person.username : '')    
                
        return (
            <div style={{ width: '48px', height: '48px' }}>
                <div style={{ height: '0px' }}>
                    <div 
                        className='ce-avatar'
                        style={{ 
                            ...styles.avatar, 
                            ...customStyle, 
                            ...{ 
                                backgroundColor: this.state.avatar ? 'white' : color,
                                backgroundImage: this.state.avatar && `url(${this.state.avatar})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: '48px',
                            }
                        }}
                    >   
                        <div 
                            className='ce-avatar-text'
                            style={styles.avatarText}
                        >
                            { !this.state.avatar && text }
                        </div>
                    </div>
                </div>

                {
                    this.props.show_online !== false && 
                    <div
                        className='ce-avatar-status'
                        style={{
                            ...styles.status, 
                            ...{ backgroundColor: person.is_online ? '#52c41a' : '#f5222d' }
                        }}
                    />
                }
            </div>
        )
    }
}

const styles = {
    avatar: {
        width: '44px',
        height: '44px',
        borderRadius: '22px',
        color: 'white',
        textAlign: 'center',
    },
    avatarText: {
        color: 'white', 
        paddingTop: '12px', 
        fontSize: '15px', 
        fontWeight: '600'
    },
    status: { 
        width: '8px', 
        height: '8px', 
        borderRadius: '100%', 
        border: '2px solid white',   
    }
}