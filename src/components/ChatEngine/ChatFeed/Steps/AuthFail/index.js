import React from 'react'

const AuthFail = (props) => {
    const project = props.projectID ? props.projectID : props.publicKey
    return (
        <div
            id='ce-login-fail-breaker' 
            style={{ width: '100%', textAlign: 'center', paddingTop: 'calc(50% - 112px)' }}
        >
            <div 
                id='ce-login-fail-text' 
                style={{ color: '#afafaf', fontWeight: '600', fontSize: '14px', marginBottom: '6px', marginRight: '32px', marginLeft: '32px' }}
            >
                Your credentials are incorrect. Make sure your Project ID, Username, and Password are correct <a href={`https://chatengine.io/projects/${project}`}>here</a>.
            </div>

            <img
                id='ce-login-fail-gif' 
                style={{ width: '50%', maxWidth: '200px' }}
                src='https://chat-engine-assets.s3.amazonaws.com/welcome_gifs/no.gif'
                alt='chat-engine-login-fail'
            />
        </div>   
    )
}

export default AuthFail