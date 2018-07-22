import { fromJS } from 'immutable';
import {
  PRISTINE_LOGIN_FORM,
  LOGIN_ON_CHANGE,
  LOGIN_FAIL, LOGOUT
} from '../actions/auth';
import { createReducer } from '../utils/redux';

const initialState = fromJS({
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

const login = createReducer({
  [[PRISTINE_LOGIN_FORM, LOGOUT]]: () => initialState,
  [LOGIN_ON_CHANGE]: (state, { payload }) => (
    state
      .set(payload.field, fromJS({
        status: false,
        errMsg: '',
        value: payload.value
      }))
  ),
  [LOGIN_FAIL]: (state, { payload }) => (
    state
      .set(payload.field, fromJS({
        status: true,
        errMsg: payload.errMsg,
        value: state.getIn([payload.field, 'value'])
      }))
  ),
}, initialState);

export default login;
