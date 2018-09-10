// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import {
  Button,
  Header,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';
import { sortBy } from 'lodash';

import ToolsModalBidName from './Modal/BidName';

class ToolsProxy extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      nameBidToRemove: null,
      openModal: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings
    } = this.props;

    actions.getTable('eosio', settings.account, 'namebids');
  }

  onOpenModal = (nameBidToRemove) => this.setState({ openModal: true, nameBidToRemove });

  onCloseModal = () => {
    this.setState({
      nameBidToRemove: null,
      openModal: false
    });
  }

  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      keys,
      settings,
      system,
      tables,
      validate,
      wallet,
      t
    } = this.props;

    const {
      nameBidToRemove,
      openModal,
      successMessage
    } = this.state;

    const nameBids = tables &&
                     tables.eosio &&
                     tables.eosio[settings.account] &&
                     tables.eosio[settings.account].namebids.rows;

    const nameBidsToDisplay = sortBy(nameBids, 'newName');

    return (
      <Segment basic>
        <ToolsModalBidName
          account={accounts[settings.account]}
          actions={actions}
          balance={balances[settings.account]}
          blockExplorers={blockExplorers}
          nameBidToRemove={nameBidToRemove}
          keys={keys}
          onClose={this.onCloseModal}
          openModal={openModal}
          settings={settings}
          system={system}
          validate={validate}
          wallet={wallet}
        />
        <Header
          content={t('tools_delegation_header_text')}
          floated="left"
          subheader={t('tools_delegation_subheader_text')}
        />
        <Message
          content={t('tools_delegation_info_content')}
          header={t('tools_delegation_info_header')}
          icon="circle question"
          info
        />
        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : false }

        {(!nameBidsToDisplay || nameBidsToDisplay.length === 0)
          ? (
            <Message
              content={t('tools_delegations_none')}
              warning
            />
          ) : (
            <Table definition>
              <Table.Header>
                <Table.Row key="tools_contacts_headers">
                  <Table.HeaderCell width="3">
                    {t('tools_bid_name_account_name')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    {t('tools_bid_name_new_name')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    {t('tools_bid_name_amount')}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {nameBidsToDisplay.map((nameBid) => (
                  <Table.Row>
                    <Table.Cell textAlign="right">
                      {nameBid.name}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      {nameBid.amount}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button
                        color="red"
                        icon="minus circle"
                        onClick={() => {
                          this.setState({
                            nameBidToRemove: nameBid,
                            openModal: true
                          });
                        }}
                        size="mini"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsProxy);
