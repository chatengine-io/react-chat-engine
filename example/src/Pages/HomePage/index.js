import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, logout } from '../../Actions/Accounts'

import { DEVELOPMENT, PROJECT_ID } from '../../consts'

import { ChatEngineWrapper } from 'react-chat-engine'

import ChatEngine from './ChatEngine'


const HomePage = props => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [userSecret, setUserSecret] = useState('')
    const { id } = props.match.params

    function submit(){
        setLoading(true)

        props.login(
            {userName, userSecret}, 
            () => setLoading(false),
            (error) => console.log(error)
        )
    }
    
    if (!props.accounts.userName) {
        return (
            <div>
                <input 
                    type='text'
                    placeholder='User Name'
                    id='home-page-username-input'
                    onChange={(e) => setUserName(e.target.value)}
                />

                <input 
                    type='password'
                    placeholder='Password'
                    id='home-page-password-input'
                    onChange={(e) => setUserSecret(e.target.value)}
                />

                <button 
                    onClick={() => submit()}
                    id='home-page-login-button'
                    style={{ backgroundColor: loading ? '#f0f0f0' : '#91d5ff' }}
                >
                    Submit
                </button>
            </div>
        )
    }

    return (
        <div style={{ position: 'absolute', top: '0px', width: '100%' }}>
            <ChatEngineWrapper>
                <ChatEngine 
                    {...props.accounts} 
                    prod={!DEVELOPMENT} 
                    id={parseInt(id)} 
                    projectID={PROJECT_ID}
                />
            </ChatEngineWrapper>

            <button 
                onClick={() => props.logout()}
                id='home-page-logout-button'
                style={{ position: 'absolute', bottom: '24px', right: '24px' }}
            >
                Logout!
            </button>
        </div>
    )
}

function mapStateToProps(state){
    return { accounts: state.accounts }
}
  
function mapDispatchToProps(dispatch){
    return bindActionCreators({ login, logout }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)