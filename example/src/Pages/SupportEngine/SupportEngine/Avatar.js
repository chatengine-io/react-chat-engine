import React, { useState } from "react";

const Avatar = props => {
    const [hovered, setHovered] = useState(false)

    return (
        <div style={props.style}>
            <div 
                style={{
                    ...styles.avatarHello,
                    ...{ opacity: hovered ? '1' : '0' }
                }}
            >
                Hey it's Adam 🤙
            </div>

            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.onClick()}
                style={{
                    ...styles.chatWithMeButton,
                    ...{ border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0' }
                }}
            />
        </div>
    )
}

export default Avatar;

const styles = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border
        borderRadius: '50%',
        // Transition
        transition: "all .33s ease",
        WebkitTransition: "all .33s ease",
        MozTransition: "all .33s ease",
        // Background 
        backgroundImage: `url(https://chat-engine-assets.s3.amazonaws.com/tutorials/my-face-min.png)`, 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '84px',
        // Size
        width: '84px',
        height: '84px',
    },
    avatarHello: { 
        position: 'absolute', 
        left: 'calc(-100% - 44px - 28px)', 
        top: 'calc(50% - 24px)', 
        // Layering
        zIndex: '10000',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        // Border + Color
        padding: '12px 12px 12px 16px',
        borderRadius: '24px', 
        backgroundColor: '#f9f0ff',
        color: 'black',
        // Transition
        transition: "all .33s ease",
        WebkitTransition: "all .33s ease",
        MozTransition: "all .33s ease",
    }
}
