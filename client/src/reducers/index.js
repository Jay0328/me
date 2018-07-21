import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import login from './login';
import articlesList from './articlesList';
import article from './article';
import categories from './categories';
import tags from './tags';
import UI from './UI';

const reducers = combineReducers({
  auth,
  login,
  articlesList,
  article,
  categories,
  tags,
  UI,
  routing: routerReducer,
});

export default reducers;
