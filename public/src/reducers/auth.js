import { fromJS } from 'immutable';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/authActions';

const initialState = fromJS({
  isAuthenticated: false,
  token: ''
});

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('token', action.token).set('isAuthenticated', true);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default Authentication;
