import React from 'react';

import { editChat } from 'react-chat-engine'

import { Button } from '../../components/Button'
import { TextInput } from '../../components/Input'

export default class MessageForm extends React.Component {
    state = {
        value: ''
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();

        editChat(
            this.props.creds, 
            this.props.chat.id,
            { title: this.state.value }
        )
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>

                <TextInput 
                    label="Rename this Chat" 
                    value={this.state.value} 
                    handleChange={this.handleChange.bind(this)} 
                    style={{ width: 'calc(100% - 18px)', marginBottom: '12px' }}
                />

            </form>
        );
    }
}