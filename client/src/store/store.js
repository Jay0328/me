import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { Map } from 'immutable';
import reducers from '../reducers';
import rootEpic from '../actions/rootEpic';

const initialState = Map();

const create = history => {
  const isProduction = process.env.NODE_ENV === 'production';
  /*  eslint no-underscore-dangle: 0  */
  const composeEnhancers = (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const middleware = [routerMiddleware(history), reduxThunk, createEpicMiddleware(rootEpic)];
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default create;
