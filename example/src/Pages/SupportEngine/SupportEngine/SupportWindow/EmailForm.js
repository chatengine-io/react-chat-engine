import React, { useState } from "react"

import axios from 'axios'

import { LoadingOutlined } from '@ant-design/icons'

import Avatar from '../Avatar'

const EmailForm = props => {    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    function getOrCreateUser(callback) {
        axios.put(
            'https://api.chatengine.io/users/',
            {username: email, email: email, secret: email},
            {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            {usernames: [email, 'Adam La Morre'], is_direct_chat: true},
            {headers: {
                "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
                "User-Name": email,
                "User-Secret": email,
            }}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create chat error', e))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)

        getOrCreateUser(
            user => {
                props.setUser(user)
                getOrCreateChat(chat => {
                    setLoading(false)
                    props.setChat(chat)
                })
            }
        )
    }

    return (
        <div 
            style={{
                ...styles.supportWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>
                
                <div style={styles.bottomText}>
                    Enter your email <br /> to get started.
                </div>
            </div>
        </div>
    )
}

export default EmailForm;

const styles = {
    supportWindow: { 
        width: '100%',  
        backgroundColor: 'wheats',
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'relative',
        top: '-45px',
        width: '100%',
        height: '308px',
        backgroundColor: '#7a39e0',
        transform: 'skewY(-12deg)',
    },
    topText: { 
        position: 'relative',
        width: '100%', 
        top: '15%', 
        color: 'white', 
        fontSize: '24px', 
        fontWeight: '600',
    },
    emailInput: { 
        width: '66%',
        textAlign: 'center',
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #7a39e0',
    },
    bottomText: { 
        position: 'absolute', 
        width: '100%', 
        top: '60%', 
        color: '#7a39e0', 
        fontSize: '24px', 
        fontWeight: '600' 
    },
    loadingDiv: { 
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        textAlign: 'center', 
        backgroundColor: 'white',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    loadingIcon: { 
        color: '#7a39e0', 
        position: 'absolute', 
        top: 'calc(50% - 51px)', 
        left: 'calc(50% - 51px)',  
        fontWeight: '600',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    }
}
