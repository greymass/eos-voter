// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';
import GlobalTransactionModal from '../../Global/Transaction/Modal';

class RexLendSavings extends PureComponent<Props> {
  state = {
    confirming: false,
    transactionType: 'add'
  };
  componentDidMount() {
    const { actions, settings } = this.props;

    actions.clearSystemState();

    actions.getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account);
  }
  confirmTransaction = () => {
    const { actions } = this.props;
    const {
      amountToAddToSavings,
      amountToRemoveFromSavings,
      transactionType
    } = this.state;

    if (transactionType === 'add') {
      actions.mvtosavings(amountToAddToSavings);
    } else {
      actions.mvfrsavings(amountToRemoveFromSavings);
    }
  };
  handleChange = (e, { name, value, valid }) => {
    this.setState({ error: null }, () => {
      if (valid) {
        this.setState({ [name]: value });
      } else {
        return this.setState({ error: 'invalid_amount' });
      }

      if (name === 'transactionType') {
        this.setState({ amountToAddToSavings: null, amountToRemoveFromSavings: null });
      }

      const { tables, settings } = this.props;

      const rexBalance = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.rex_balance`) || '0.0000 REX';
      const maturedRex = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.matured_rex`) || '0.0000 REX';
      const rexMaturities = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.rex_maturities`, []);
      const rexMaturing = rexMaturities.reduce((rexMaturity, total) => total + rexMaturity.second) / 10000;
      const rexInSavings = rexBalance.split(' ')[0] - (maturedRex.split(' ')[0] + rexMaturing);

      let notEnoughBalance = false;
      let notEnoughBalanceInSavings = false;

      if (name === 'amountToAddToSavings') {
        notEnoughBalance =
          Number((rexBalance || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      } else if (name === 'amountToRemoveFromSavings') {
        notEnoughBalanceInSavings =
          Number((rexInSavings || '').split(' ')[0]) <
          Number(value.split(' ')[0]);
      }

      if (notEnoughBalance) {
        this.setState({ error: 'insufficient_balance' });
      }
      if (notEnoughBalanceInSavings) {
        this.setState({ error: 'insufficient_balance_savings' });
      }
    });
  };
  onClose = () => {
    this.setState({
      confirming: false,
      amountToAddToSavings: undefined,
      amountToRemoveFromSavings: undefined,
    });
  };
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
      tables,
      t
    } = this.props;
    const {
      amountToAddToSavings,
      amountToRemoveFromSavings,
      confirming,
      error,
      transactionType,
    } = this.state;

    const dropdownOptions = ['add', 'remove']
      .map((type) => (
        {
          key: type,
          text: t(`rex_interface_savings_options_${type}`, { chainSymbol: connection.chainSymbol }),
          value: type
        }
      ));

    let transaction;
    let contract;

    const actionName = transactionType === 'buy' ? 'BUYREX' : 'SELLREX';

    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }

    const saveDisabled = error ||
      (!amountToAddToSavings && transactionType === 'add') ||
      (!amountToRemoveFromSavings && transactionType === 'remove');

    if (!tables.eosio || !tables.eosio.eosio) return false;

    const maturedRex = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.matured_rex`, '0.0000 REX');
    const rexBalance = get(tables, `eosio.eosio.rexbal.${settings.account}.rows.0.rex_balance`, '0.0000 REX');

    const confirmationPage = confirming ? (
      <GlobalTransactionModal
        actionName={
          transactionType === 'add' ? 'MVTOSAVINGSREX' : 'MVFRSAVINGSREX'
        }
        actions={actions}
        blockExplorers={blockExplorers}
        content={(
          <React.Fragment>
            { transactionType === 'add' ? (
              <p>
                {t('rex_interface_savings_confirmation_modal_add', {
                  amountToAddToSavings,
                })}
              </p>
            ) : (
              <p>
                {t('rex_interface_savings_confirmation_modal_remove', {
                  amountToRemoveFromSavings,
                })}
              </p>
            )}
            <Container>
              <Button
                color="green"
                content={t('common:confirm')}
                disabled={system.BUYREX || system.SELLREX || system.UNSTAKETOREX}
                floated="right"
                onClick={this.confirmTransaction}
                textAlign="right"
              />
              <Button
                content={t('common:cancel')}
                onClick={() => this.setState({
                  amountToAddToSavings: undefined,
                  amountToRemoveFromSavings: undefined,
                  confirming: false,
                })}
                textAlign="left"
              />
            </Container>
          </React.Fragment>
        )}
        contract={contract}
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        open
        settings={settings}
        system={system}
        title={t('rex_interface_manage_rex_confirmation_modal_header')}
        transaction={transaction}
      />
    ) : false;

    return (
      <React.Fragment>
        <Header>
          {t('rex_interface_manage_rex_header', { chainSymbol: connection.chainSymbol })}
          <Header.Subheader>
            {t('rex_interface_manage_rex_subheader', { chainSymbol: connection.chainSymbol })}
          </Header.Subheader>
        </Header>
        {confirming ? confirmationPage : (
          <React.Fragment>
            <Divider />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Header
                    content="REX Balances"
                  />
                  <Table definition size="small" textAlign="right">
                    <Table.Row>
                      <Table.Cell width={12}>REX Balance</Table.Cell>
                      <Table.Cell>{Number(parseFloat(rexBalance) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width={12}>Matured REX Balance</Table.Cell>
                      <Table.Cell>{Number(parseFloat(maturedRex) || 0).toFixed(4)}</Table.Cell>
                    </Table.Row>
                  </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Header
              content="Exchange EOS/REX"
            />
            <Form as={Segment} secondary>
              <Form.Group widths="equal">
                <label>
                  <strong>{t('rex_interface_transaction_type_label')}</strong>
                  <br />
                  <Dropdown
                    autoFocus
                    defaultValue={transactionType}
                    name="transactionType"
                    onChange={(e, props) => this.handleChange(e, { ...props, valid: true })}
                    options={dropdownOptions}
                    selection
                    style={{ marginTop: '4px', width: 250 }}
                  />
                </label>

                {transactionType === 'add' ? (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToAddToSavings"
                    label={t('rex_interface_savings_rex_add', { chainSymbol: connection.chainSymbol })}
                    name="amountToAddToSavings"
                    onChange={this.handleChange}
                    symbol="REX"
                  />
                ) : (
                  <GlobalFormFieldToken
                    connection={connection}
                    key="amountToRemoveFromSavings"
                    label={t('rex_interface_savings_rex_remove', { chainSymbol: connection.chainSymbol })}
                    name="amountToRemoveFromSavings"
                    onChange={this.handleChange}
                    symbol="REX"
                  />
                )}
              </Form.Group>
              {error && (
                <GlobalFormMessageError
                  error={error}
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                />
              )}
              <Button
                content={transactionType === 'add' ? t('rex_interface_savings_options_add') : t('rex_interface_savings_options_remove')}
                disabled={saveDisabled}
                primary
                onClick={() => this.setState({ confirming: true })}
              />
            </Form>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default translate('rex')(RexLendSavings);
