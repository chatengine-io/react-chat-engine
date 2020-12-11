import React, { Component } from 'react'

import { stringToColor } from '../../Utilities/colorMapping' 


export default class Avatar extends Component {

    render() {
        const { person } = this.props
        const customStyle = this.props.style ? this.props.style : {}
        const text = person.username ? person.username.substring(0, 2).toUpperCase() : ''
        const color = stringToColor(person ? person.username : '')        
        
        return (
            <div>

                {
                    this.props.show_online !== false && 
                    <div  
                        style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '100%', 
                            position: 'absolute', 
                            border: '2px solid white',
                            backgroundColor: person.is_online ? '#52c41a' : '#f5222d' 
                        }} 
                    />
                }

                <div style={{ ...styles.avatar, ...customStyle, ...{ backgroundColor: color } }}>
                    
                    <div style={{ color: 'white', paddingTop: '12px', fontSize: '15px', fontWeight: '600' }}>
                    
                        { text }
                    
                    </div>
                
                </div>
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
    }
}