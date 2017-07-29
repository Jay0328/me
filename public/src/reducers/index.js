import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';

const reducers = combineReducers({
  auth,
  login,
  routing: routerReducer,
});

export default reducers;
