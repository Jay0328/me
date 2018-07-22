import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { Map } from 'immutable';
import rootEpic from 'Actions/rootEpic';
import reducers from '../reducers';
import epicMiddleware from './epicMiddleware';

const initialState = Map();

const create = history => {
  const isProduction = process.env.NODE_ENV === 'production';
  /*  eslint no-underscore-dangle: 0  */
  const composeEnhancers = (!isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const middleware = [routerMiddleware(history), reduxThunk, epicMiddleware];
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  epicMiddleware.run(rootEpic);
  return store;
};

export default create;
