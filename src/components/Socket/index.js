import React, { Component } from 'react'

import { connectSocket } from './connect'

export default class Socket extends Component {
    state = {
        rws: null
    }

    componentDidMount() {
        if (!this.props.publicKey && !this.props.projectID) {
            console.log("You need an API key. Register for one here: https://chatengine.io")
            return;
        }

        this.setState({
            rws: connectSocket(this.props)
        })
    }

    componentWillUnmount(){
        this.state.rws && this.state.rws.close() 
    }

    render() {
        return <div />
    }
}
