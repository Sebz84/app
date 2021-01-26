import React from 'react';
import {
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

import { connect } from 'react-redux';
import I18n from 'i18next';

const SettingsRowInput = (props) => {
  const {
    id,
    name,
    text,
    label,
    field,
    fieldName,
    placeholder,
    handleInputs,
  } = props;

  return (
    <InputGroup>
      <Input
        type='text'
        name={`${name}`}
        id={`${id}`}
        placeholder={`${placeholder}`}
        value={field || ''}
        onChange={(event) => handleInputs(event, `${fieldName}`)}
      />
      <Label for='pruneTo'>{I18n.t(`containers.settings.${label}`)}</Label>
      {text && (
        <InputGroupAddon addonType='append'>
          <InputGroupText>
            {I18n.t(`containers.settings.${text}`)}
          </InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(SettingsRowInput);
