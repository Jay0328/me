import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import InputField from '../InputField';
import { pristineLoginForm, loginOnChange, login } from '../../actions/authActions';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'calc(50% - 150px)',
    paddingBottom: 'calc(150px)'
  }
};

const Login = ({ classes, username, pwd1, pwd2, pristine, handleOnChange, handleOnSubmit }) => (
  <form
    className={classes.form}
    onSubmit={handleOnSubmit(username, pwd1, pwd2)}
  >
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
      validationState={pwd1.status}
      errMsg={pwd1.errMsg}
      label="密碼 1"
      type="password"
      placeholder="請輸入密碼"
      onChange={handleOnChange('password1')}
    />
    <InputField
      id="password2"
      validationState={pwd2.status}
      errMsg={pwd2.errMsg}
      label="密碼 2"
      type="password"
      placeholder="請輸入密碼"
      onChange={handleOnChange('password2')}
    />
    <section className="actions">
      <button
        className="positive"
        onClick={handleOnSubmit(username, pwd1, pwd2)}
      >
        read my name
      </button>
      <button onClick={pristine()} >清除</button>
    </section>
  </form>
);

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  username: PropTypes.shape().isRequired,
  pwd1: PropTypes.shape().isRequired,
  pwd2: PropTypes.shape().isRequired,
  pristine: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  username: state.getIn(['login', 'username']),
  pwd1: state.getIn(['login', 'password1']),
  pwd2: state.getIn(['login', 'password2'])
});

const mapDispatchToProps = (dispatch) => ({
  pristine: () => e => {
    e.preventDefault();
    dispatch(pristineLoginForm());
  },
  handleOnChange: field => e => {
    e.preventDefault();
    dispatch(loginOnChange(field, e.target.value));
  },
  handleOnSubmit: (username, password1, password2) => e => {
    e.preventDefault();
    dispatch(login({ username, password1, password2 }));
  }
});

const LoginContainer = ConnectWithToJS(
  mapStateToProps,
  mapDispatchToProps,
  Login
);

export default injectSheet(styles)(LoginContainer);
