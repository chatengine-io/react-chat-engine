import React from 'react';

import { editChat } from 'react-chat-engine'

import { TextInput } from '../../components/Input'

export default class MessageForm extends React.Component {
    state = {
        activeChat: null,
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

    // Update on new active chat. TODO: Find more eloquent way perhaps
    componentDidUpdate() {
        if(this.props.chat.title !== this.state.value && this.state.activeChat !== this.props.chat.id) {
            this.setState({ 
                value: this.props.chat.title,
                activeChat: this.props.chat.id
            })
        }
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} style={{ zIndex: 100 }}>

                <TextInput 
                    label="Rename this Chat" 
                    value={this.state.value} 
                    default={this.props.chat.title}
                    handleChange={this.handleChange.bind(this)} 
                    style={{ 
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '12px',
                        border: '0px solid white',
                        width: 'calc(100% - 18px)',
                    }}
                />

            </form>
        );
    }
}