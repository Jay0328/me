import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';

const InputField = ({ id, validationState, label, errMsg, ...props }) => {
  return (
    <Form.Field error={validationState}>
      <label htmlFor={id}>{label}</label>
      <Input id={id} {...props} />
      {!!validationState && <Message error content={errMsg} />}
    </Form.Field>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  validationState: PropTypes.bool,
  label: PropTypes.string.isRequired,
  errMsg: PropTypes.string
};

InputField.defaultProps = {
  validationState: false,
  errMsg: ''
};

export default InputField;
