import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import InputField from './InputField';
import { pristineLoginForm, loginOnChange, login } from '../actions/authActions';

const styles = {
  form: {
  },
  actions: {}
};

const Login = ({ username, password1, password2, pristine, handleOnChange, handleOnSubmit }) => (
  <form onSubmit={handleOnSubmit(username, password1, password2)}>
    <InputField
      id="username"
      validationState={username.status}
      errMsg={username.errMsg}
      label="使用者帳號"
      type="text"
      placeholder="請輸入使用者帳號"
      onChange={handleOnChange('username')}
    />
    <InputField
      id="password1"
      validationState={password1.status}
      errMsg={password1.errMsg}
      label="密碼 1"
      type="password"
      placeholder="請輸入密碼"
      onChange={handleOnChange('password1')}
    />
    <InputField
      id="password2"
      validationState={password2.status}
      errMsg={password2.errMsg}
      label="密碼 2"
      type="password"
      placeholder="請輸入密碼"
      onChange={handleOnChange('password2')}
    />
    <section className="actions">
      <button
        className="positive"
        onClick={handleOnSubmit(username, password1, password2)}
      >
        read my name
      </button>
      <button onClick={pristine()} >清除</button>
    </section>
  </form>
);

Login.propTypes = {
  username: PropTypes.shape().isRequired,
  password1: PropTypes.shape().isRequired,
  password2: PropTypes.shape().isRequired,
  pristine: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  username: state.getIn(['login', 'username']).toObject(),
  password1: state.getIn(['login', 'password1']).toObject(),
  password2: state.getIn(['login', 'password2']).toObject()
});

const mapDispatchToProps = (dispatch) => ({
  pristine: () => e => {
    e.preventDefault();
    dispatch(pristineLoginForm());
  },
  handleOnChange: (field) => e => {
    e.preventDefault();
    dispatch(loginOnChange(field, e.target.value));
  },
  handleOnSubmit: (username, password1, password2) => e => {
    e.preventDefault();
    dispatch(login({ username, password1, password2 }));
  }
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default injectSheet(styles)(LoginContainer);
