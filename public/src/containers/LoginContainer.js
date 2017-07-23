import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Login from '../components/Login';
import { pristineLoginForm, loginOnChange, login } from '../actions/authActions';

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
  handleOnChange(e, { id, value }) {
    e.preventDefault();
    dispatch(loginOnChange(id, value));
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

export default withRouter(LoginContainer);
