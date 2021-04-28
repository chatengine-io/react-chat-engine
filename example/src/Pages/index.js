import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import history from '../Utilities/history'

import UserSocketFeedPage from './UserSocketFeedPage'
import ChatSocketPage from './ChatSocketPage'
import DirectChatsPage from './DirectChatsPage'
import ChatTutorial from './ChatTutorial'
import HomePage from './HomePage'
import GifPage from './GifPage'

class RootPage extends Component {
  render() {    
    return (
      <Router history={history}>
        <Switch>
          <Route path='/user_socket_feed' component={UserSocketFeedPage} />
          <Route path='/chat_socket' component={ChatSocketPage} />
          <Route path='/direct' component={DirectChatsPage} />
          <Route path='/tutorial' component={ChatTutorial} />
          {/* <Route path='/gif' component={GifPage} /> */}
          <Route path='/:id' component={HomePage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps(state){
  return { accounts: state.accounts }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RootPage)
