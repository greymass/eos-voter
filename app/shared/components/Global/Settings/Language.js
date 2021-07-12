// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

const languages = [
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'en', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'Français' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'Italiano' },
  { key: 'ja', value: 'ja-JP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한국어' },
  { key: 'ru', value: 'ru-RU', flag: 'ru', text: 'Русский' },
];

export class GlobalSettingsLanguage extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions, i18n } = this.props;
    i18n.changeLanguage(value);
    actions.setSetting('lang', value);
  };

  render() {
    const {
      name,
      setLanguage,
      selection,
      t
    } = this.props;

    return (
      <Dropdown
        name={name}
        onChange={this.onChange}
        options={languages}
        placeholder={t('global_select_language')}
        selection={selection}
        value={setLanguage || 'en-US'}
      />
    );
  }
}

export default withTranslation('global')(GlobalSettingsLanguage);
