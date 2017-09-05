import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, ...props }) => (
  <div>
    <input id={id} {...props} />
  </div>
);

Input.propTypes = {
  id: PropTypes.string.isRequired
};

const ErrorMessage = ({ content }) => (
  <div className="error message">
    <div className="content">
      <p>{content}</p>
    </div>
  </div>
);

ErrorMessage.propTypes = {
  content: PropTypes.string.isRequired
};

const InputField = ({ id, validationState, label, errMsg, ...props }) => (
  <div className={validationState ? 'error field' : 'field'}>
    <label htmlFor={id}>{label}</label>
    <Input id={id} {...props} />
    {!!validationState && <ErrorMessage content={errMsg} />}
  </div>
);

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
