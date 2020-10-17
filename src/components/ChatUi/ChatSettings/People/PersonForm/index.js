import React from 'react';

import { addPerson } from 'react-chat-engine'

import { Button } from '../../../components/Button'
import { AutoCompleteInput } from '../../../components/Input'

import { getOtherPeople } from '../../../../../actions/people'

export default class PersonForm extends React.Component {
  state = {
    value: '',
    others: []
  }

  handleChange(value) {
    this.setState({ value });
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

  onGetOthers(others) {
    const usernames = []
    others.map(other => {
      usernames.push(other.username)
    })
    this.setState({ others: usernames })
  }

  getOthers() {
    getOtherPeople(
      this.props.creds,
      this.props.chat.id,
      (id, others) => this.onGetOthers(others),
      () => {},
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>

        <AutoCompleteInput 
          label='Type a username'
          value={this.state.value}
          options={this.state.others}
          onFocus={() => this.getOthers()}
          handleChange={(value) => this.handleChange(value)} 
          style={{ width: 'calc(100% - 24px)', marginBottom: '12px' }}
        />

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