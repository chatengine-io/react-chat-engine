import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, logout } from '../Actions/Accounts'

import { ChatEngine } from 'react-chat-engine'

const prod = window.location.host.indexOf('chatengine.io') !== -1

class HomePage extends Component {
    state = {
        loading: false,
        rootUrl: prod ? 'https://api.chatengine.io/' : 'http://127.0.0.1:8000/',
        projectID: prod ? '8a1f9edb-a05a-4b55-9d6e-ec399a38f5a9' : '1ed59673-1fd6-46ed-9eb9-56239a6a4f82',
        userName: '',
        userSecret: '',
    }

    submit(){
        this.setState({ loading: true })
        this.props.login(
            this.state, 
            () => {},
            (error) => console.log(error)
        )
    }
    
    render() {  
        if (!this.props.accounts.userName) {
            return (
                <div>
                    <input 
                        type='text'
                        placeholder='User Name'
                        onChange={(e) => this.setState({ userName: e.target.value })}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        onChange={(e) => this.setState({ userSecret: e.target.value })}
                    />

                    <button 
                        onClick={() => this.submit()}
                        style={{ backgroundColor: this.state.loading ? '#f0f0f0' : '#91d5ff' }}
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
                    development={!prod}
                    userName={this.props.accounts.userName}
                    userSecret={this.props.accounts.userSecret}
                    projectID={this.props.accounts.projectID}
                />

                <button 
                    onClick={() => this.props.logout()}
                    style={{ position: 'absolute', bottom: '24px', right: '24px' }}
                >
                    Logout
                </button>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { accounts: state.accounts }
}
  
function mapDispatchToProps(dispatch){
    return bindActionCreators({ login, logout }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)