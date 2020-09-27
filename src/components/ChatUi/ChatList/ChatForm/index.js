import React from 'react';

import { newChat } from 'react-chat-engine'

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

        newChat(
            this.props.creds, 
            { title: this.state.value },
            () => this.setState({ value: '' })
        )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>

          <div style={{ width: 'calc(100% - 26px)', border: '1px solid #d9d9d9', borderRadius: '24px', backgroundColor: 'white' }}>
            
            <div style={{ height: '0px' }}>
              <TextInput 
                label='New Chat'
                value={this.state.value}
                style={{ width: 'calc(100% - 26px - 48px)', borderColor: 'white' }}
                handleChange={(e) => this.handleChange(e)}
              />
            </div>

            <div style={{ width: '100%', textAlign: 'right', marginTop: '1px' }}>
              <Button 
                icon='plus'
                type="submit" 
              />
            </div>
          
          </div>

        </form>
      );
    }
}