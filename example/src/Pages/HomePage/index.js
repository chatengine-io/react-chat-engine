import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, logout } from '../../Actions/Accounts'

import { ROOT_URL, DEVELOPMENT, PROJECT_ID } from '../../consts'

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
            { rootUrl: ROOT_URL, projectID: PROJECT_ID, userName, userSecret },
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
            <div style={{ height: '20px' }}>
                <button 
                    id='home-page-logout-button'
                    onClick={() => props.logout()}
                >
                    Logout!
                </button>
            </div>
            
            <ChatEngineWrapper>
                <ChatEngine 
                    height={'calc(100vh - 20px)'}
                    development={DEVELOPMENT}
                    id={parseInt(id)}
                    projectID={PROJECT_ID}
                />
            </ChatEngineWrapper>
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