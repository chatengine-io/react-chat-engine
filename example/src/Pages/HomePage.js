import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, logout } from '../Actions/Accounts'

import { ChatEngineWrapper } from 'react-chat-engine'

import ChatEngine from './ChatEngine'

const prod = window.location.host.indexOf('chatengine.io') !== -1

const HomePage = props => {
    const [state, setState] = useState({
        loading: false,
        rootUrl: prod ? 'https://api.chatengine.io/' : 'http://127.0.0.1:8000/',
        projectID: prod ? '8a1f9edb-a05a-4b55-9d6e-ec399a38f5a9' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82',
        userName: '',
        userSecret: '',
    })
    const { id } = props.match.params

    function submit(){
        setState({ ...state, loading: true })
        props.login(
            state, 
            () => {},
            (error) => console.log(error)
        )
    }
    
    if (!props.accounts.userName) {
        return (
            <div>
                <input 
                    type='text'
                    placeholder='User Name'
                    onChange={(e) => setState({ ...state, userName: e.target.value })}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    onChange={(e) => setState({ ...state, userSecret: e.target.value })}
                />

                <button 
                    onClick={() => submit()}
                    style={{ backgroundColor: state.loading ? '#f0f0f0' : '#91d5ff' }}
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
                    prod={prod} 
                    id={parseInt(id)} 
                />
            </ChatEngineWrapper>

            <button 
                onClick={() => props.logout()}
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