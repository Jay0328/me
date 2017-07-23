import Immutable, { fromJS } from 'immutable';
import { PRISTINE_LOGIN_FORM, LOGIN_ONCHANGE, LOGIN_FAIL, LOGOUT } from '../actions/authActions';

const initialState = Immutable.fromJS({
  username: {
    status: false,
    errMsg: '',
    value: ''
  },
  password1: {
    status: false,
    errMsg: '',
    value: ''
  },
  password2: {
    status: false,
    errMsg: '',
    value: ''
  }
});

const login = (state = initialState, action) => {
  switch (action.type) {
    case PRISTINE_LOGIN_FORM:
      return initialState;
    case LOGIN_ONCHANGE:
      return state.set(action.field, fromJS({
        status: false,
        errMsg: '',
        value: action.value
      }));
    case LOGIN_FAIL:
      return state.set(action.field, fromJS({
        status: true,
        errMsg: action.errMsg,
        value: state.getIn([action.field, 'value'])
      }));
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default login;
