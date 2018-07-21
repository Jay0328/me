import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import InputField from 'Components/atoms/InputField';
import { pristineLoginForm, loginOnChange, login } from 'Actions/auth';
import styles from './styles';

const mapStateToProps = state => ({
  username: state.getIn(['login', 'username']),
  pwd1: state.getIn(['login', 'password1']),
  pwd2: state.getIn(['login', 'password2'])
});

const mapDispatchToProps = dispatch => ({
  pristine: e => {
    e.preventDefault();
    dispatch(pristineLoginForm());
  },
  onChange: field => e => dispatch(loginOnChange(field, e.target.value)),
  onSubmit: (e) => {
    e.preventDefault();
    dispatch(login());
  }
});

@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@injectSheet(styles)
class Login extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    username: PropTypes.shape().isRequired,
    pwd1: PropTypes.shape().isRequired,
    pwd2: PropTypes.shape().isRequired,
    pristine: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const { classes, username, pwd1, pwd2, pristine, onChange, onSubmit } = this.props;
    return (
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <InputField
          id="username"
          validationState={username.status}
          errMsg={username.errMsg}
          label="使用者帳號"
          type="text"
          placeholder="請輸入使用者帳號"
          value={username.value}
          onChange={onChange('username')}
        />
        <InputField
          id="password1"
          validationState={pwd1.status}
          errMsg={pwd1.errMsg}
          label="密碼 1"
          type="password"
          placeholder="請輸入密碼"
          value={pwd1.value}
          onChange={onChange('password1')}
        />
        <InputField
          id="password2"
          validationState={pwd2.status}
          errMsg={pwd2.errMsg}
          label="密碼 2"
          type="password"
          placeholder="請輸入密碼"
          value={pwd2.value}
          onChange={onChange('password2')}
        />
        <section className="actions">
          <button
            className="positive"
            onClick={onSubmit}
          >
            read my name
          </button>
          <button onClick={pristine} >清除</button>
        </section>
      </form>
    );
  }
}

export default Login;
