import { fromJS } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/auth';
import { createReducer } from '../utils/redux';

const initialState = fromJS({
  isAuthenticated: null,
  token: null,
});

const Authentication = createReducer({
  [LOGIN_SUCCESS]: (state, { payload: token }) =>
    state
      .set('token', token)
      .set('isAuthenticated', true),
  [LOGOUT]: (state) =>
    state
      .set('token', null)
      .set('isAuthenticated', false),
}, initialState);

export default Authentication;
