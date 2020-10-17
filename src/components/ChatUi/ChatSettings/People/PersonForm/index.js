import React from 'react';

import { addPerson, getOtherPeople } from 'react-chat-engine'

import { AutoCompleteInput } from '../../../components/Input'

import Option from './Option'

export default class PersonForm extends React.Component {
  state = {
    value: '',
    others: []
  }

  handleChange(value) {
    this.setState({ value });
  }

  addPerson(name) {
    addPerson(
      this.props.creds,
      this.props.chat.id,
      name,
      () => { 
        this.setState({ value: '' }); 
        this.getOthers(); 
      }
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

  renderOption(option) {
    return <Option text={option} onClick={() => this.addPerson(option)} />
  }

  render() {
    return (
      <div style={{ marginBottom: '12px' }}>

        <AutoCompleteInput 
          label='Type a username'
          value={this.state.value}
          options={this.state.others}
          onFocus={() => this.getOthers()}
          handleChange={(value) => this.handleChange(value)} 
          style={{ width: 'calc(100% - 24px)' }}
          renderOption={(option) => this.renderOption(option)}
        />

      </div>
    );
  }
}
