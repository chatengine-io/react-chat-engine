import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, logout } from '../../Actions/Accounts'

import { ChatEngine } from 'react-chat-engine'

const ROOT_URL = 'https://api.chatengine.io/'
const PROJECT_ID = '12b6b495-2c5d-43d6-a210-b5c26f1e0126'

const HomePage = props => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [userSecret, setUserSecret] = useState('')

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
            <ChatEngine 
                height='100vh'
                userName={props.accounts.userName}
                userSecret={props.accounts.userSecret}
                projectID={PROJECT_ID}
            />

            <button 
                onClick={() => props.logout()}
                id='home-page-logout-button'
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