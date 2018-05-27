import { fromJS } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth';
import { createReducer } from '../utils/redux';

const initialState = fromJS({
  isAuthenticated: false,
  token: ''
});

const Authentication = createReducer({
  [LOGIN_SUCCESS]: (state, { payload: token }) =>
    state
      .set('token', token)
      .set('isAuthenticated', true),
  [LOGOUT]: () => initialState
}, initialState);

export default Authentication;
