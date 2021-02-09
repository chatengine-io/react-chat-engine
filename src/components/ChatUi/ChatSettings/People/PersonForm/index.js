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

  getOthers() {
    getOtherPeople(
      this.props.creds,
      this.props.chat.id,
      (id, others) => this.setState({ others }),
      () => {},
    )
  }

  renderOption(option) {
    return <Option text={option.username} onClick={() => this.addPerson(option)} />
  }

  render() {
    return (
      <div style={{ marginBottom: '12px' }}>
        <AutoCompleteInput 
          style={{ width: '100%' }}
          label='Type a username'
          value={this.state.value}
          options={this.state.others}
          onFocus={() => this.getOthers()}
          handleChange={(value) => this.handleChange(value)} 
          renderOption={(option) => this.renderOption(option)}
        />
      </div>
    );
  }
}
