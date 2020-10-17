import React from 'react';

import { addPerson } from 'react-chat-engine'

import { Button } from '../../../components/Button'
import { AutoCompleteInput } from '../../../components/Input'

export default class PersonForm extends React.Component {
  state = {
    value: ''
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    addPerson(
      this.props.creds,
      this.props.chat.id,
      this.state.value,
      () => this.setState({ value: '' })
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <div onClick={() => console.log('okok')} >
          <AutoCompleteInput 
            label='Type a username'
            value={this.state.value}
            handleChange={(e) => this.handleChange(e)} 
            style={{ width: 'calc(100% - 24px)', marginBottom: '12px' }}
          />
        </div>

        <Button 
          type="submit" 
          value="Add Group Member" 
          icon='user-add'
          style={{ width: '100%', marginBottom: '12px' }}
        />

      </form>
    );
  }
}