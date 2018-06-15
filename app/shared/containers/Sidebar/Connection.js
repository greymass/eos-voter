// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Button, Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WelcomeConnectionContainer from '../Welcome/Connection';

import * as SettingsActions from '../../actions/settings';

class SidebarConnection extends Component<Props> {
  state = { editing: false }
  continueSetup = () => {
    const {
      actions,
      history
    } = this.props;
    const {
      setSetting
    } = actions;
    setSetting('skipImport', false);
    history.push('/');
  }
  onToggle = () => this.setState({ editing: !this.state.editing });
  render() {
    const {
      chain,
      t,
      settings,
      wallet
    } = this.props;
    const {
      editing
    } = this.state;
    let formattedHost = '';
    try {
      const { host } = new URL(settings.node);
      formattedHost = host;
    } catch (e) {
      // console.log('url error', e);
    }
    let controls = [(
      <Button
        icon="settings"
        key="nodeToggle"
        floated="right"
        onClick={this.onToggle}
        size="small"
      />
    ), (
      <Header
        key="nodeHeader"
        size="tiny"
        style={{ marginTop: 0 }}
      >
        {t('block_height')}: {chain.head_block_num}
        <Header.Subheader>
          {formattedHost}
        </Header.Subheader>
      </Header>
      )];
    if (editing) {
      controls = <WelcomeConnectionContainer onStageSelect={this.onToggle} />;
    }
    return (
      <Segment
        size="small"
        stacked
      >
        {(wallet.account)
          ? controls
          : (
            <Button
              color="purple"
              content={t('continue_setup')}
              fluid
              onClick={this.continueSetup}
            />
          )
        }
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    chain: state.chain,
    keys: state.keys,
    settings: state.settings,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('common'),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarConnection);
