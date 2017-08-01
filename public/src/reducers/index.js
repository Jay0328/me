import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';
import article from './article';

const reducers = combineReducers({
  auth,
  login,
  article,
  routing: routerReducer,
});

export default reducers;
