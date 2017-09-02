import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import reducers from '../reducers';

const initialState = Immutable.Map();

const create = history => {
  let middleware = [routerMiddleware(history), reduxThunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger({ stateTransformer: state => state.toJS() })];
  }
  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  );
};

export default create;
