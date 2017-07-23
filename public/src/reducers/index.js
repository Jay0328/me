import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';

const reducers = combineReducers({
  routerReducer,
  auth,
  login,
});

export default reducers;
