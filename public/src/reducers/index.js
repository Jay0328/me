import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';
import articlesList from './articlesList';
import article from './article';
import tags from './tags';

const reducers = combineReducers({
  auth,
  login,
  articlesList,
  article,
  tags,
  routing: routerReducer,
});

export default reducers;
