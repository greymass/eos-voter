// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form } from 'semantic-ui-react';

export default class JurisdictionsForm extends Component<Props> {
  state = {
    options: []
  }

  componentDidMount() {
    const { actions, jurisdictions } = this.props;
    actions.getJurisdictions();
    this.makeOptions(jurisdictions);
  }

  makeOptions(jurisdictions) {
    const options = [];
    const j = jurisdictions.jurisdictions;
    if (j) {
      for (let i = 0; i < j.length; i += 1) {
        const name = `${j[i].name} (${j[i].description})`;
        options.push({ code: j[i].code, value: name, text: name });
      }
    }
    this.setState({
      options
    });
  }

  changeValue() {
    const newValue = [];
    const oldValue = this.props.jurisdictions.choosenJurisdictions;
    for (let i = 0; i < oldValue.length; i += 1) {
      if (oldValue[i] !== null && oldValue[i] !== undefined) {
        newValue.push(oldValue[i].value);
      }
    }
    return newValue;
  }

  onChange(data) {
    const jurisdictions = [];
    for (let i = 0; i < data.value.length; i += 1) {
      jurisdictions.push(data.options.find(o => o.value === data.value[i]));
    }
    this.props.actions.saveChoosenJurisdictions(jurisdictions);
  }

  render() {
    const newValue = this.changeValue();
    const { label } = this.props;

    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Form.Dropdown
              options={this.state.options}
              placeholder="Select Jurisdiction"
              fluid
              search
              multiple
              selection
              value={newValue}
              onChange={(e, value) => this.onChange(value)}
              label={label}
            />
          )
        }
      </I18n>
    );
  }
}
