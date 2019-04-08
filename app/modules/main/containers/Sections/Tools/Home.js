// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';

import { Grid, Header, Segment } from 'semantic-ui-react';

import NavigationActions from '../../../actions/navigation';

const toolSections = {
  tools_menu_token_header: {
    tools_menu_airgrabs: {
      path: 'tools/airgrabs'
    },
    tools_menu_customtokens: {
      path: 'tools/custom_tokens'
    },
    tools_menu_delegations: {
      path: 'tools/delegations'
    }
  },
  tools_menu_security_header: {
    tools_menu_recommendation: {
      path: 'tools/recommendations'
    },
    tools_menu_keygenerator: {
      path: 'tools/key_generator'
    },
    tools_menu_permissions: {
      path: 'tools/permissions'
    },
    tools_menu_keys: {
      path: 'tools/key_validator'
    }
  },
  tools_menu_hardware_header: {
    tools_menu_ledger: {
      path: 'tools/ledger'
    }
  },
  tools_menu_third_party_services_header: {
    tools_menu_beos_crosschaintransfer: {
      path: 'tools/crosschain_transfer'
    }
  },
  tools_menu_network_utilities_header: {
    'API Performance Analysis': {
      path: 'tools/api_ping'
    }
  },
  tools_menu_registration_header: {
    tools_menu_create_account: {
      path: 'tools/create_account'
    },
    tools_menu_proxy: {
      path: 'tools/proxy'
    }
  },
  tools_menu_utilities_header: {
    tools_menu_name_bidding: {
      path: 'tools/bid_name'
    },
    tools_menu_contacts: {
      path: 'tools/contacts'
    },
    tools_menu_contracts: {
      path: 'tools/smart_contracts'
    }
  }
};

class ToolsHome extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  onReset = () => this.props.actions.clearSettingsCache()

  render() {
    const  { t } = this.props;
    const linkStyle = { cursor: 'pointer' };

    return (
      <Grid columns={4}>
        {Object.keys(toolSections).map(sectionGroupTitle => (
          <Grid.Column>
            <Segment.Group vertical>
              <Header attached="top" inverted>
                {t(sectionGroupTitle)}
              </Header>
              {Object.keys(toolSections[sectionGroupTitle]).map(sectionTitle => (
                <Segment>
                  <a
                    name={toolSections[sectionGroupTitle][sectionTitle].path}
                    onClick={this.onClick}
                    style={linkStyle}
                  >
                    {t(sectionTitle)}
                  </a>
                </Segment>
              ))}
            </Segment.Group>
          </Grid.Column>
        ))}
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default withRouter(connect(() => {}, mapDispatchToProps)(translate('tools')(ToolsHome)));
